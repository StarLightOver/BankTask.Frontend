import {Component} from "react";
import type {ClientType} from "../Types/ClientType";
import {createFounder, editFounder, getFounder} from "../api/FounderApi";
import type {FounderType} from "../Types/FounderType";
import {Link, Navigate} from "react-router-dom";
import '../Styles/displayClient.css';

type FormInput = {
    id: number,
    name: string,
    inn: string,
}

type Props = {
    type: "create" | "edit",
    id?: number,
};

type State = {
    founder: FormInput,
    errors: Array<string>,
    open: boolean
}

class DisplayFounder extends Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            founder: {
                id: 0,
                inn: '',
                name: '',
            },
            errors: [],
            open: true,
        }
    }

    onSubmitEditButton = e => {
        if (!this.isValidForm())
            return;

        const {id, name, inn} = this.state.founder;
        const client: FounderType = {
            id: id,
            name: name,
            inn: Number(inn),
        };
        editFounder(client)
            .then(() => this.setState({open: false}))
    }

    onSubmitCreateButton = e => {
        if (!this.isValidForm())
            return;

        const {name, inn} = this.state.founder;
        const client: ClientType = {
            name: name,
            inn: Number(inn),
        };
        createFounder(client)
            .then(() => this.setState({open: false}))
    }

    isValidForm = () => {
        const founder = this.state.founder;
        const errors = [];

        if (!founder.name || founder.name.length === 0)
            errors.push("Имя не заполнено!")
        else {
            if (founder.name.length > 100)
                errors.push("Слишком длинное Имя (более 100)");
            if (founder.name.trim() === "")
                errors.push("Пустая строка или слишком много пробелов");
        }

        if (!founder.inn || founder.inn.length === 0)
            errors.push("ИНН не заполнено!")
        else{            
            const intInn = +founder.inn;
            if (isNaN(intInn)) {
                errors.push("ИНН должен быть числом");
            }
            else{
                if (intInn <= 100000000000 || intInn >= 999999999999){
                    errors.push("Некорректный ИНН (12 цифр, не может начинаться с 0)");
                }
            }
        }

        this.setState({errors: errors});
        return errors.length === 0;
    }

    onChange = e => {
        const {value, name} = e.target;
        const founderForm = this.state.founder;

        founderForm[name] = value;
        this.setState({founder: founderForm})

        this.isValidForm();
    }

    async componentDidMount() {
        const id = this.props.id;
        if (id) {
            const founder: FounderType = await getFounder(id);
            
            this.setState({
                founder: {
                    id: founder.id,
                    name: founder.name,
                    inn: founder.inn.toString(),
                }
            })
        }
    }

    render(_, state) {
        const {errors, founder} = this.state;

        return (
            <div>
                <form>
                    <p style={{alignContent: "center"}}>Это форма ввода Учредителя</p>
                    <span style={{margin: '10px'}}>ФИО</span>
                    <input type="text" name="name" placeholder="Name" value={founder.name} onChange={this.onChange}/>

                    <span style={{margin: '10px'}}>ИНН</span>
                    <input type="text" name="inn" placeholder="INN" value={founder.inn} onChange={this.onChange}/>
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
                    <Link to={`/founders`} style={{textDecoration: 'none', color: 'black'}}>Вернуться на главную</Link>
                </button>

                {!this.state.open && (
                    <Navigate to="/founders" replace={true}/>
                )}
            </div>
        );
    }
}

export default DisplayFounder