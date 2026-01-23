import { defaultTasks } from "../helpers/utils"

interface SelectDefaultProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
}

export default function SelectDefault({className, ...props}:SelectDefaultProps) {

    return (
      <label className={className}>
        <select 
            name="selectedDefault"
            {...props}
        >
             <option value="">Sugestões</option>
            {defaultTasks.map((task) =>
                <option 
                    key={"default-"+task} 
                    value={task}
                >
                    {task}
                </option>
            )}
        </select>
      </label>
    );
}
  