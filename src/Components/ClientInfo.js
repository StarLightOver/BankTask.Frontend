import type {ClientType} from "../Types/ClientType";
import {Component} from "react";
import {getClient} from "../api/ClientApi";
import {getFounder} from "../api/FounderApi";
import type {FounderType} from "../Types/FounderType";

type Props = {
    id: number,
}

type State = {
    client: ClientType,
    founders: Array<FounderType>
}

class ClientInfo extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            client: null,
            founders: []
        };
    }

    async componentDidMount() {
        if (this.props.id) {
            const client: ClientType = await getClient(this.props.id);
            this.setState({client: client});
            
            if (client.founders.length > 0){
                const founders = await Promise.all(client.founders.map((id) => {
                    return getFounder(id);
                }));
                this.setState({founders: founders});
            }
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.id && this.props.id !== prevProps.id) {
            const id = this.props.id;
            if (id) {
                const client: ClientType = await getClient(id);
                this.setState({client: client});

                if (client.founders.length > 0){
                    const founders = await Promise.all(client.founders.map((id) => {
                        return getFounder(id);
                    }));
                    this.setState({founders: founders});
                }
            }

        }
    }

    render() {
        const {client, founders} = this.state;
        if (!client) return <div>Нажмите "Инфо" у компании...</div>;

        return (
            <div>
                <h1>
                    {client.name}
                </h1>
                <p>ИНН клиента: {client.inn}</p>
                <p>Форма: {client.type}</p>
                <p>Учредители: {founders.length > 0
                && founders.reduce((previousValue, currentValue) => previousValue + `${currentValue.name} (${currentValue.inn})\n` + "\n", '')}</p>
            </div>
        );
    }
}

export default ClientInfo