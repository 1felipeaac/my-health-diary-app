import Text from "../components/text";
import { cx } from "class-variance-authority";
import { formatDateShort } from "../helpers/utils";
import taskUseCases from "../useCases/taskUseCases";

interface TaskHistoryDetailsProps {
    date?: Date;
    onClose: () => void;
}

export function TaskHistoryDetails({ onClose, date }: TaskHistoryDetailsProps) {

    const {findByDate} = taskUseCases()

    const tasks = date ? findByDate(date) : [];

    return (
        <>
            <div 
                className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm animate-in fade-in"
                onClick={onClose} 
            />
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] 
                            bg-white p-4 rounded-2xl shadow-2xl w-[90%] max-w-md 
                            max-h-[80vh] overflow-y-auto animate-in zoom-in-95">
                
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 className="font-bold text-gray-700 capitalize">
                        {date ? `${formatDateShort(date)}` : "Tarefas do Dia"}
                    </h3>
                    <button onClick={onClose} className="text-gray-400">✕</button>
                </div>

                <div className="flex flex-col gap-3">
                    {tasks.map((task) => (
                        <div 
                            key={task.id} 
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
                        >
                            <div className={cx(
                                "w-4 h-4 rounded-full shrink-0",
                                task.rating === 'good' ? 'bg-green-base' : 
                                task.rating === 'average' ? 'bg-yellow-base' : 'bg-red-base'
                            )} />
                            
                            <Text className="flex-1 text-gray-800 font-medium">
                                {task.title}
                            </Text>
                        </div>
                        
                    ))}
                </div>
            </div>
        </>
    );
}