import Link from 'next/link'
import styles from '../styles/nav.module.css'

const MainMenu = () => (
    <aside id={styles.menu}>
        <img src="./cf1.png" alt="casa de fazenda"/>
        <nav>
            <ul>
                <li>
                    <Link href="/">
                        <a>Pagina inicial</a>
                    </Link>
                </li>
                <li>
                    <Link href="/pessoas">
                        Gerenciar pessoas
                    </Link>
                </li>
                <li>
                    <Link href="/usuarios">
                        <a>Gerenciar usuarios </a>
                    </Link>
                </li>
                <li>
                    <Link href="/propriedades">
                        <a>Gerenciar propriedades </a>
                    </Link>
                </li>
            </ul>
        </nav>
    </aside>
)

export default MainMenu