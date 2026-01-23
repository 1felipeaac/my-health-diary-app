import React from "react";
import Container from "./container";
import { today } from "../helpers/utils";
import type { Task } from "../models/task";
import taskUseCases from "../useCases/taskUseCases";
import { cva } from "class-variance-authority";
import Card from "./card";
import { TaskHistoryDetails } from "../core-components/task-histoty-details";
import { buttonIconVariants } from "./button-icon";
import Icon from "./icon";
import Text from "./text";
import { NavLink } from "react-router";
import ArrowLeft from "../assets/icons/Arrow-Left.svg?react"


const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export const buttonDayWrapperVariants = cva(`
  flex items-start gap-1 text-[10px] leading-none
  `)

export function CalendarTasks(){
    const [currentMonth, setCurrentMonth] = React.useState(today.getMonth());
    const [currentYear, setCurrentYear] = React.useState(today.getFullYear());
    
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);

    function handleCloseDetails(){ 
      setSelectedDate(undefined)
    }

    function handleGetDateTask(date: Date){
      setSelectedDate(date)
    }

    const {tasks}=taskUseCases()
  
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  function handlePrevMonth(){
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  function handleNextMonth(){
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };
  

  function getRatingsForDay(day: number, month: number, year: number, allTasks: Task[]){
    
    const tasksForDay = allTasks.filter(task => {
      if(!task.createdAt) return
      const taskDate = new Date(task.createdAt);
      return (
        taskDate.getDate() === day &&
        taskDate.getMonth() === month &&
        taskDate.getFullYear() === year &&
        task.createdAt
      );
    });
  
    // Conta a ocorrência de cada rating
    return {
      good: tasksForDay.filter(t => t.rating === 'good'),
      average: tasksForDay.filter(t => t.rating === 'average'),
      bad: tasksForDay.filter(t => t.rating === 'bad'),
      taskDate: tasksForDay.map(t => t.createdAt)
    };
  };

  function renderDays(){
        const rows = [];
        let cells = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            cells.push(<td key={`empty-start-${i}`} className="p-0.5 md:p-2" />);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const counts = getRatingsForDay(day, currentMonth, currentYear, tasks);
        
            cells.push(
              <td 
                key={day} 
                className="md:p-1 h-15 w-15 vertical-align-top hover:bg-gray-50 transition-colors"
                
              >
                <Card
                  onClick={()=>handleGetDateTask(counts.taskDate[0]!)}
                >
                  {/* Número do dia */}
                  <span className="text-xs font-semibold text-shadow-gray-400 ml-0.5 mt-0.5">{day}</span>
                  
                  {/* Indicadores de Ratings */}
                  <div className="flex flex-wrap items-center gap-0.5 w-10 h-10 p-1 overflow-y-auto">
                    {counts.good.length > 0 && (
                      <div className={buttonDayWrapperVariants()}>
                        {counts.good.map((task) => 
                          <span key={task.id+task.title} className="w-2 h-2 rounded-full bg-green-base" />
                        )}
                        
                      </div>
                    )}
                    {counts.average.length > 0 && (
                      <div className={buttonDayWrapperVariants()}>
                        {counts.average.map((task) => 
                          <span key={task.id+task.title} className="w-2 h-2 rounded-full bg-yellow-base" />
                        )}
                        
                      </div>
                    )}
                    {counts.bad.length > 0 && (
                      <div className={buttonDayWrapperVariants()}>
                        {counts.bad.map((task) => 
                          <span key={task.id+task.title} className="w-2 h-2 rounded-full bg-red-base" />
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              </td>
            );
        
            if (cells.length === 7) {
              rows.push(<tr key={`row-${day}`}>{cells}</tr>);
              cells = [];
            }
          }

        if (cells.length > 0) {
            while (cells.length < 7) {
                cells.push(<td key={`empty-end-${cells.length}`}  />);
            }
            rows.push(<tr key="last-row">{cells}</tr>);
        }

        return rows;
    };

    return(
      <>
        <NavLink to={"/"} className={"flex items-center justify-start ml-2 gap-1.5 mb-2"}>
            <Icon svg={ArrowLeft} className={buttonIconVariants({variant: "quaternary"})}/>
            <Text variant={"body-sm-bold"}>
                Tarefas
            </Text>
        </NavLink>
        <Container>
            <div className="max-w-md mx-auto bg-gray-200 pb-0.5 shadow-lg rounded-lg overflow-hidden">
                <div className="flex items-center justify-between mb-4 p-1">
                    <h2 className="text-lg font-bold capitalize text-gray-400">
                        {new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(new Date(currentYear, currentMonth))}
                    </h2>
                    <div className="flex gap-2">
                        <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-200 rounded">◀</button>
                        <button onClick={handleNextMonth} className="p-2 hover:bg-gray-200 rounded">▶</button>
                    </div>
                </div>

                <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-50">
                    {daysOfWeek.map((day) => (
                        <th key={day} className="p-2 min-w-10 text-sm font-extrabold text-red-dark">
                        {day}
                        </th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {renderDays()}
                </tbody>
                </table>
            </div>
        </Container>
        {selectedDate && (
          <TaskHistoryDetails
              onClose={handleCloseDetails} 
              date={selectedDate}
          />
      )}
      </>
    )
}