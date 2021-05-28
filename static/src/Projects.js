import getProjects from "./getProjects";
import React from "react";

class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {projects: []};
    }
    render() {
        getProjects()
            .then(res => this.setState(state => { return {projects : res.data}}))
            .catch(reason => console.error(reason));

        return (
            <div>
                <h2>Projects</h2>
                <table>
                    <thead><tr><th>name</th><th>description</th><th>source code url</th></tr></thead>
                    <tbody>
                        {this.state.projects.map((d) => <tr><td>{d.name}</td><td>{d.description}</td><td>{d.source_url}</td></tr>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Projects