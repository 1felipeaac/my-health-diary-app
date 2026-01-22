import React from "react";
import Container from "./container";
import { today } from "../helpers/utils";
import type { Task } from "../models/task";
import taskUseCases from "../useCases/taskUseCases";

// definir o elemento do HTML onde o calendário será exibido
const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export function CalendarTasks(){
    const [currentMonth, setCurrentMonth] = React.useState(today.getMonth());
    const [currentYear, setCurrentYear] = React.useState(today.getFullYear());

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
    // Filtra as tarefas que pertencem a este dia específico
    const tasksForDay = allTasks.filter(task => {
      if(!task.createdAt) return
      const taskDate = new Date(task.createdAt); // Assumindo que sua task tem um campo 'date'
      return (
        taskDate.getDate() === day &&
        taskDate.getMonth() === month &&
        taskDate.getFullYear() === year
      );
    });
  
    // Conta a ocorrência de cada rating
    return {
      good: tasksForDay.filter(t => t.rating === 'good').length,
      average: tasksForDay.filter(t => t.rating === 'average').length,
      bad: tasksForDay.filter(t => t.rating === 'bad').length,
    };
  };

  function renderDays(){
        const rows = [];
        let cells = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            cells.push(<td key={`empty-start-${i}`} className="p-2" />);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const counts = getRatingsForDay(day, currentMonth, currentYear, tasks);
        
            cells.push(
              <td key={day} className="p-1 border h-15 w-14 vertical-align-top hover:bg-gray-50 transition-colors">
                <div className="flex flex-col h-full justify-between">
                  {/* Número do dia */}
                  <span className="text-xs font-semibold text-gray-700">{day}</span>
                  
                  {/* Indicadores de Ratings */}
                  <div className="flex flex-col gap-0.5 mt-1">
                    {counts.good > 0 && (
                      <div className="flex items-center gap-1 text-[10px] text-green-700 leading-none">
                        <span className="w-2 h-2 rounded-full bg-green-base" /> {counts.good}
                      </div>
                    )}
                    {counts.average > 0 && (
                      <div className="flex items-center gap-1 text-[10px] text-yellow-700 leading-none">
                        <span className="w-2 h-2 rounded-full bg-yellow-base" /> {counts.average}
                      </div>
                    )}
                    {counts.bad > 0 && (
                      <div className="flex items-center gap-1 text-[10px] text-red-700 leading-none">
                        <span className="w-2 h-2 rounded-full bg-red-base" /> {counts.bad}
                      </div>
                    )}
                  </div>
                </div>
              </td>
            );
        
            if (cells.length === 7) {
              rows.push(<tr key={`row-${day}`}>{cells}</tr>);
              cells = [];
            }
          }

        if (cells.length > 0) {
            while (cells.length < 7) {
                cells.push(<td key={`empty-end-${cells.length}`} className="p-2 border text-green-dark" />);
            }
            rows.push(<tr key="last-row">{cells}</tr>);
        }

        return rows;
    };
    return(
        <Container className="p-4">
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold capitalize">
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
    )
}