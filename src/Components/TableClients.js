import {Component} from "react";
import type {ClientType} from "../Types/ClientType";
import '../Styles/styles.css';
import {Link} from "react-router-dom";
import "../Types/CompanyFormType";
import {CompanyFormType} from "../Types/CompanyFormType";
import "../Styles/table.css"

type Props = {
    clients: Array<ClientType>,
    onSelectActiveClient: (id: number) => {},
    onDel: (id: number) => {},
}

type State = {}

class TableClients extends Component<Props, State> {

    render() {
        return (
            this.props.clients
                ? <div className="table">
                    <table>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Название</th>
                            <th>Инн</th>
                            <th>Тип</th>
                            <th>Количество учредителей</th>
                            <th/>
                        </tr>
                        </thead>

                        <tbody>
                        {this.props.clients.map((client, index) =>
                            <tr key={index}>
                                <th>{client.id}</th>
                                <th>{client.name}</th>
                                <th>{client.inn}</th>
                                <th>{CompanyFormType.find(item => item.value === client.type).label}</th>
                                <th>{client.founders.length}</th>
                                <th>
                                    <button
                                        onClick={() => {this.props.onSelectActiveClient(client.id)}}
                                    >
                                        Инфо
                                    </button>
                                    <button>
                                        <Link to={`/edit/${client.id}`} style={{textDecoration: 'none', color: 'black'}} >Редактировать</Link>
                                    </button>
                                    <button onClick={() => {this.props.onDel(client.id)}}>
                                        Удалить
                                    </button>
                                </th>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    <div style={{margin: '10px', width: '20%', border: 'none'}}>
                        <button>
                            <Link to={`/create`} style={{textDecoration: 'none', color: 'black'}} >Добавить нового клиента</Link>
                        </button>
                        <button>
                            <Link to={`/founders`} style={{textDecoration: 'none', color: 'black'}} >Таблица Учредителей</Link>
                        </button>
                    </div>
                </div>
                : <div>Loading...</div>
        )
    }
}

export default TableClients;