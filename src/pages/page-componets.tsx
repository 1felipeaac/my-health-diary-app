import Badge from "../components/badge";
import Button from "../components/button";
import ButtonIcon from "../components/button-icon";
import Card from "../components/card";
import Container from "../components/container";
import Icon from "../components/icon";
import InputCheckbox from "../components/input-checkbox";
import InputText from "../components/input-text";
import Skeleton from "../components/skeleton";
import Text from "../components/text"

import TrashIcon from "../assets/icons/Trash-Regular.svg?react"
import CheckRegularIcon from "../assets/icons/Check-Regular.svg?react"
import SpinnerIcon from "../assets/icons/Spinner.svg?react"
import MindSpinnerIcon from "../assets/icons/Mind-Spinner.svg?react"
import PencilIcon from "../assets/icons/PencilSimple-Regular.svg?react"
import PlusIcon from "../assets/icons/Plus-Regular.svg?react"
import SquareRegularIcon from "../assets/icons/Square-Regular.svg?react"
import XRegularIcon from "../assets/icons/X-Regular.svg?react"

export default function PageComponents(){

    return (
        <Container>
          <div className="grid gap-10">
            <div className="flex flex-col gap-2">
              <Text variant="body-sm-bold" className="text-pink-dark">
                Olá mundo!
              </Text>
              <Text className="text-green-dark">
                Olá mundo!
              </Text>
              <Text variant="body-md-bold" className="text-gray-400">
                Olá mundo!
              </Text>
            </div>
            <div className="flex gap-1">
              <Icon svg={TrashIcon} className="fill-green-light"/>
              <Icon svg={CheckRegularIcon}/>
              <Icon svg={PlusIcon}/>
              <Icon svg={SpinnerIcon} animate/>
              <Icon svg={MindSpinnerIcon} style={{width: '32px', height: '32px'}} animate/>
              <Icon svg={PencilIcon}/>
              <Icon svg={SquareRegularIcon}/>
              <Icon svg={XRegularIcon}/>
            </div>
    
            <div className="flex gap-1">
              <Badge variant={"secondary"}>5</Badge>
              <Badge variant={"primary"}>2 de 5</Badge>
              <Badge loading>2 de 5</Badge>
            </div>
    
            <div className="flex gap-1">
              <Button icon={PlusIcon}>
                Nova Tarefa
              </Button>
              <Button handling icon={PlusIcon}>
                Criando...
              </Button>
            </div>
    
            <div className="flex gap-1">
              <ButtonIcon icon={TrashIcon}/>
              <ButtonIcon icon={TrashIcon} variant={"secondary"}/>
              <ButtonIcon icon={TrashIcon} variant={"tertiary"}/>
              <ButtonIcon loading icon={TrashIcon}/>
              <ButtonIcon handling icon={TrashIcon}/>
            </div>
    
            <div className="flex gap-1">
              <InputText/>
            </div>
    
            <div className="flex gap-1">
              <InputCheckbox/>
              <InputCheckbox loading/>
            </div>
            <div className="flex gap-1">
              <Card size={"md"}>Olá Mundo!</Card>
            </div>
    
            <div className="space-y-2">
              <Skeleton className="h-6"/>
              <Skeleton className="h-6"/>
              <Skeleton className="h-6 w-96"/>
            </div>
    
          </div>
        </Container>
      )

}