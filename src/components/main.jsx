import { useTranslation } from 'react-i18next'

import fundo from '../assets/fundoImage.png'

function Main() {

    const { t } = useTranslation()
    return (
        <div className="main" id='main'>
            

            <div className="apresentacao">
                <span className="spanOi">{t('oi')}</span>

                <h1>
                    {t('euSou')} <span className="highlight">Breno Groba</span>
                </h1>

                <p className='pApresentacao'>{t('apresentacao')}q</p>
            </div>

            <div className="foto">
            <img src={fundo} alt="" />
            </div>

           



        </div>
    )
}

export default Main
