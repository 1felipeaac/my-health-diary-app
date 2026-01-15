import Badge from "../components/badge";
import Text from "../components/text";

interface TasksSummaryProps {
    total: number
    concluded: number
    loading?: boolean
    labels?: {
      total?: string
      concluded?: string
    }
  }

export default function TasksSummaryDB({
    total,
    concluded,
    loading = false,
    labels,
  }: TasksSummaryProps){
        
     
    return(
        <>
            <div className="flex items-center gap-2">
                <Text variant={"body-sm-bold"} className="!text-gray-300"> {labels?.total ?? 'Tarefas criadas'}</Text>
                <Badge 
                    variant={"secondary"} 
                    loading={loading}
                >{total}</Badge>
            </div>
            <div className="flex items-center gap-2">
                <Text variant={"body-sm-bold"} className="!text-gray-300"> {labels?.concluded ?? 'Concluídas'}</Text>
                <Badge 
                    variant={"primary"} 
                    loading={loading}
                >{concluded} de {total}</Badge>
            </div>
        </>
    )

}