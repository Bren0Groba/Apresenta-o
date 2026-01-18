import { useTranslation } from 'react-i18next'
import logo from '../assets/LOGO_Header.png'

function Header() {
     const { i18n } = useTranslation()
      const { t } = useTranslation()
  return (
    <div className="header">
     <img src={logo} alt="Logo" className="logo" />
      
      <div className="nav-links">
        <a href="#main">{t('aHome')}</a>
        <a href="">{t('aSobre')}</a>
        <a href="">{t('aExperiencias')}</a>
        <a href="">{t('aPortifolio')}</a>
        <a href="">{t('aCursos')}</a>
        <a href="">{t('aContato')}</a>
      </div>
      <div>
     <button className='btnIdioma' onClick={() => i18n.changeLanguage('pt')}>
        PT-BR
      </button>

      <button className='btnIdioma' onClick={() => i18n.changeLanguage('en')}>
        EN
      </button>
      </div>
    </div>
  )
}

export default Header
