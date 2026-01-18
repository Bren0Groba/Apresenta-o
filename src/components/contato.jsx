import { useTranslation } from 'react-i18next'
import {
    FaPhoneAlt,
    FaEnvelope,
    FaInstagram,
    FaGithub,
    FaLinkedin
} from 'react-icons/fa'

function Contato() {
    const { t } = useTranslation()

    return (
        <div className="section-contato">
            <div className="linha-vermelha" />

            <h2>{t('contato.title')}</h2>
            <p>{t('contato.description')}</p>

            <div className="contact-bar">
                <ContactItem
                    icon={<FaPhoneAlt />}
                    title={t('contato.telefone')}
                    value="+55 11 97069-1099"
                />

                <ContactItem
                    icon={<FaEnvelope />}
                    title="E-mail"
                    value="brenogroba@gmail.com"
                />



                <ContactItem
                    icon={<FaGithub />}
                    title="Github"
                    value="github.com/BrenOGroba"
                />
                <ContactItem
                    icon={<FaInstagram />}
                    title="Instagram"
                    value="@brenogroba"
                />
                <ContactItem
                    icon={<FaLinkedin />}
                    title="LinkedIn"
                    value="linkedin.com/in/breno-groba"
                />
            </div>
        </div>
    )
}

function ContactItem({ icon, title, value }) {
    return (
        <div className="contact-item">
            <div className="icon-circle">
                {icon}
            </div>

            <div className="contact-text">
                <strong>{title}</strong>
                <span>{value}</span>
            </div>
        </div>
    )
}

export default Contato
