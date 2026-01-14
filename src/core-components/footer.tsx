import { BackupButtons } from "../components/backup-buttons"
export default function Footer(){

    return(
        <footer className="my-5 md:my-10">
            <nav className="flex items-center justify-center gap-4">
                
                <BackupButtons/>
            </nav>
        </footer>

    )
}