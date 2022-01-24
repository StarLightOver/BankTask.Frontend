import {Component} from "react";
import type {ClientType} from "../Types/ClientType";
import {getFounder, getFounders} from "../api/FounderApi";
import type {FounderType} from "../Types/FounderType";
import Multiselect from 'multiselect-react-dropdown';
import {createClient, editClient, getClient} from "../api/ClientApi";
import Select from 'react-select';
import {Link, Navigate} from "react-router-dom";
import '../Styles/displayClient.css';
import {CompanyFormType} from "../Types/CompanyFormType";

type FormInput = {
    id: number,
    name: string,
    inn: string,
    type: { value: number, label: string },
    founders: Array<{ name: string, id: number }>,
}

type Props = {
    type: "create" | "edit",
    id?: number,
};

type State = {
    client: FormInput,
    errors: Array<string>,
    allFounders: Array<FounderType>,
    selectedTypeClient: number,
    open: boolean
}

class DisplayClient extends Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            client: {
                id: 0,
                inn: '',
                type: CompanyFormType[0],
                name: '',
                founders: [],
            },
            errors: [],
            allFounders: [],
            open: true,
        }
    }

    onSubmitEditButton = e => {
        if (!this.isValidForm())
            return;

        const {id, name, inn, type, founders} = this.state.client;
        const client: ClientType = {
            id: id,
            name: name,
            inn: Number(inn),
            type: type.value,
            founders: founders.map(founder => founder.id),
        };
        editClient(client)
            .then(() => this.setState({open: false}))
    }

    onSubmitCreateButton = e => {
        if (!this.isValidForm())
            return;

        const {name, inn, type, founders} = this.state.client;
        const client: ClientType = {
            name: name,
            inn: Number(inn),
            type: type.value,
            founders: founders.map(founder => founder.id),
        };
        createClient(client)
            .then(() => this.setState({open: false}))
    }

    isValidForm = () => {
        const client = this.state.client;
        const errors = [];

        if (client.name) {
            if (client.name.length > 30)
                errors.push("Слишком длинное Имя (более 30)");
            if (client.name.trim() === "")
                errors.push("Пустая строка или слишком много пробелов");
        }

        if (!client.inn || client.inn.length === 0)
            errors.push("ИНН не заполнено!")
        else{
            const intInn = +client.inn;
            if (isNaN(intInn)) {
                errors.push("ИНН должен быть числом");
            }
            else{
                if (intInn <= 100000000000 || intInn >= 999999999999){
                    errors.push("Некорректный ИНН (12 цифр, не может начинаться с 0)");
                }
            }
        }
        
        // Проверка что у ИП один владелец
        if (client.type.value === 0) {
            if (client.founders.length !== 1)
                errors.push("У ИП должен быть один владелец");
        }

        if (client.founders.length === 0) {
            errors.push("У компании должен быть хотя бы один владелец");
        }

        this.setState({errors: errors});
        return errors.length === 0;
    }

    onChange = e => {
        const {value, name} = e.target;
        const clientForm = this.state.client;

        clientForm[name] = value;
        this.setState({client: clientForm})

        this.isValidForm();
    }

    onSelectFounders = (selectedList, selectedItem) => {
        const clientForm = this.state.client;

        clientForm.founders = selectedList;
        this.setState({client: clientForm})

        this.isValidForm();
    }

    async componentDidMount() {
        const founders = await getFounders();
        this.setState({allFounders: founders});

        const id = this.props.id;
        if (id) {
            const client: ClientType = await getClient(id);

            const founders: FounderType[] = await Promise.all(client.founders.map((id) => {
                return getFounder(id);
            }))

            this.setState({
                client: {
                    id: client.id,
                    name: client.name,
                    type: CompanyFormType.find(value => value.value === Number(client.type)),
                    inn: client.inn.toString(),
                    founders: founders.map((value) => {
                        return {
                            name: `${value.name} (${value.inn})`,
                            id: value.id,
                        }
                    })
                }
            })
        }
    }

    render(_, state) {
        const {errors, allFounders, client} = this.state;

        return (
            <div>
                <form>
                    <p style={{alignContent: "center"}}>Это форма ввода Клиента</p>
                    <span style={{margin: '10px'}}>Имя</span>
                    <input type="text" name="name" placeholder="Name" value={client.name} onChange={this.onChange}/>

                    <span style={{margin: '10px'}}>ИНН</span>
                    <input type="text" name="inn" placeholder="INN" value={client.inn} onChange={this.onChange}/>

                    <span style={{margin: '10px'}}>Тип клиента</span>
                    <Select
                        value={client.type}
                        onChange={(selectedOption) => {
                            client.type = selectedOption;
                            this.setState({client: client});
                            this.isValidForm();
                        }}
                        options={CompanyFormType}
                    />

                    <span style={{margin: '10px'}}>Основатели</span>
                    <Multiselect
                        options={allFounders.map(
                            (value) => {
                                return {
                                    name: `${value.name} (${value.inn})`,
                                    id: value.id,
                                }
                            }
                        )}
                        selectedValues={client.founders}
                        onSelect={this.onSelectFounders}
                        onRemove={this.onSelectFounders}
                        displayValue="name"
                    />
                </form>

                <p>Ошибки:</p>
                {errors && errors.map((value, index) => {
                    return (<p key={index}>{index} : {value}</p>)
                })}

                {this.props.type === "create" &&
                <button type="submit" onClick={this.onSubmitCreateButton}>
                    Добавить
                </button>}
                    
                {this.props.type === "edit" &&
                <button type="submit" onClick={this.onSubmitEditButton}>
                    Изменить
                </button>}

                <button>
                    <Link to={`/`} style={{textDecoration: 'none', color: 'black'}}>Вернуться на главную</Link>
                </button>
                
                {!this.state.open && (
                    <Navigate to="/" replace={true}/>
                )}
            </div>
        );
    }
}

export default DisplayClient