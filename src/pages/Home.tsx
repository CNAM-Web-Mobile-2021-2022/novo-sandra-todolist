import React from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFab, IonFabButton, IonButton, IonPopover, IonFooter, } from '@ionic/react';

import "../custom.css";
import { Task } from '../models/tasks';
import { NewTaskForm } from "../components/NewTaskForm";
import { TasksList } from "../components/TodosList";


interface State {
  newTask: Task;
  tasks: Task[];
  showInputPopover: boolean;
}

export default class App extends React.Component<{}, State> {
  state = {
    newTask: {
      id: 1,
      name: ""
    },
    
    tasks: [],
    showInputPopover: false,
  };

  render() {
    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonTitle> To-Do List | Sandra Novo</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>

          <IonPopover 
            backdropDismiss={true}
            isOpen={this.state.showInputPopover}
            onDidDismiss={this.hidePopover}
          >
            
            <NewTaskForm
              task={this.state.newTask}
              onAdd={this.addTask}
              onChange={this.handleTaskChange}
            />

            <div className="centerButton">
              <IonButton className="subMaxWidth" expand="block" onClick={this.hidePopover}> Fermer </IonButton>
            </div> <br/>
          </IonPopover>

          <TasksList tasks={this.state.tasks} onDelete={this.deleteTask} />

        </IonContent>

        <IonFooter>
          <IonFab horizontal="center" edge={true} slot="fixed">
            <IonFabButton size="small" onClick={this.showPopover}>
              +
            </IonFabButton>
          </IonFab>
          </IonFooter>
      </>
    );
  }

  private showPopover = () => {
    this.setState({
      showInputPopover: true,
    });
  }

  private hidePopover = () => {
    this.setState({
      showInputPopover: false,
    });
  }

  private addTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState(previousState => ({
      newTask: {
        id: previousState.newTask.id + 1,
        name: ""
      },
      tasks: [...previousState.tasks, previousState.newTask]
    }));
  };

  private handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTask: {
        ...this.state.newTask,
        name: event.target.value
      }
    });
  };

  private deleteTask = (taskToDelete: Task) => {
    this.setState(previousState => ({
      tasks: [
        ...previousState.tasks.filter(task => task.id !== taskToDelete.id)
      ]
    }));
  };
};
