import {Component} from "react";
import '../Styles/styles.css';
import {Link} from "react-router-dom";
import "../Types/CompanyFormType";
import "../Styles/table.css"
import {deleteFounder, getFounders} from "../api/FounderApi";
import type {FounderType} from "../Types/FounderType";

type Props = {}

type State = {
    founders: Array<FounderType>
}

class TableFounders extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            founders: []
        }
    }

    async componentDidMount() {
        const founders: FounderType = await getFounders();
        this.setState({founders: founders});
    }

    render() {
        return (
            this.state.founders
                ? <div className="table" style={{margin: '10px'}}>
                    <table>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>ФИО Учредителя</th>
                            <th>Инн</th>
                            <th/>
                        </tr>
                        </thead>

                        <tbody>
                        {this.state.founders.map((founder, index) =>
                            <tr key={index}>
                                <th>{founder.id}</th>
                                <th>{founder.name}</th>
                                <th>{founder.inn}</th>
                                <th>
                                    <button>
                                        <Link to={`/founders/edit/${founder.id}`} style={{textDecoration: 'none', color: 'black'}} >Редактировать</Link>
                                    </button>
                                    <button onClick={async () => {
                                        await deleteFounder(founder.id);
                                        const founders: FounderType = await getFounders();
                                        this.setState({founders: founders});
                                    }}>
                                        Удалить
                                    </button>
                                </th>
                            </tr>
                        )}
                        </tbody>
                    </table>
                <div style={{margin: '10px', width: '20%', border: 'none'}}>
                    <button>
                        <Link to={`/founders/create`} style={{textDecoration: 'none', color: 'black'}} >Добавить нового учредителя</Link>
                    </button>
                    <button>
                        <Link to={`/`} style={{textDecoration: 'none', color: 'black'}} >Таблица Клиентов</Link>
                    </button>
                </div>
                    
                </div>
                : <div>Loading...</div>
        )
    }
}

export default TableFounders;