import './Styles/App.css';
import {Component} from "react";
import "bootstrap/dist/css/bootstrap.css";
import TableClients from "./Components/TableClients";
import type {ClientType} from "./Types/ClientType";
import ClientInfo from "./Components/ClientInfo";
import {deleteClient, getClients} from "./api/ClientApi";

class App extends Component {
    constructor() {
        super();
        this.state = {
            activePlace: null,
            clients: [],
        };
    }

    async componentDidMount() {
        const clients: ClientType = await getClients();
        this.setState({clients: clients});
    }

    render() {
        const activePlace = this.state.activePlace;
        const clients: ClientType[] = this.state.clients;
        
        return (
            <div className="App">
                <TableClients 
                    clients={clients}
                    onSelectActiveClient={(id) => {this.setState({activePlace: id});}}
                    onDel={async (id) => {
                        await deleteClient(id);
                        const clients: ClientType = await getClients();
                        this.setState({clients: clients});
                    }}
                />
                <ClientInfo id={activePlace}/>
            </div>
        );
    }
}

export default App;
