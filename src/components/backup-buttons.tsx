import type React from 'react'
import {databaseUseCases} from '../useCases/databaseUseCases'
import Button from './button'
import InputFile from './input-file'
import Export from '../assets/icons/Export.svg?react'
import { cva } from 'class-variance-authority'

const buttonsVariants = cva(`
hover:bg-pink-light h-14 py-4 px-5 w-full bg-transparent flex items-center justify-start
`)

export function BackupButtons(){

    async function handleExport(){
        const blob = await databaseUseCases.exportDatabase()

        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob)
        a.download = 'bkp-diary.json'
        a.click()
    }

    async function handleImport(e: React.ChangeEvent<HTMLInputElement>){
        const file = e.target.files?.[0]

        if(!file) return

        await databaseUseCases.importDatabase(file)

        alert('Importado com sucesso!')
    }

    return(
        <>
            <Button 
                className={buttonsVariants()} 
                onClick={handleExport} 
                icon={Export}
            >
                Exportar
            </Button>
            <InputFile
                className={buttonsVariants()} 
                label="Importar" 
                accept='application/json' 
                onChange={handleImport}
            />
        </>
    )
}
