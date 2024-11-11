// import Button from 'components/ui/Button/Button'
import SvgIcon from '@/components/SvgIcon/SvgIcon'
import { logo } from '@/_libs/_media/img/images.json'
import config from '@/_libs/_config/config.json'
import React from 'react'
// import { useTranslation } from 'react-i18next'
import styles from './ModalContent.module.css'
// import { useMap } from 'react-leaflet'
const ModalContent = ({ municipality, groups }: {municipality?: string, groups?: TGNFG[]}) => {
    // const { t } = useTranslation('map')
    const t = (t: string) => t
    React.useEffect(() => {
        // data ? lockMap() : unlockMap()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className={
            `${municipality ?
            'bg-black bg-opacity-40 fixed inset-0 z-[1000]' :
            'opacity-0 pointer-events-none'}
            `}>
            <div className={`${styles.ModalContent} p-[20%] bg-white z-[1001]`}>
                <h1 className={styles.municipality}>{`${municipality ? `${municipality}: ` : ''}`}</h1>
                <div className={styles.listContent}>
                <ul className={styles.ul}>
                    {groups?.map && groups.map((g: TGNFG) => {
                        const links: TLink[] = g._embedded?.grouplinks || []
                        return (
                            <li key={g.id} className={`${styles[g.grouptype]} ${styles.li}`}>
                                <div className={styles.icon}>
                                    <SvgIcon width={`2.5em`} {...{ id: logo.id }} />
                                </div>
                                <span className={`${styles.groupName} `}>{g.name}</span>
                                <div className={styles.icons}>
                                    {links.map((l: TLink, i: number) =>
                                        <a key={i} href={`${l.url}`} rel="noreferrer" target="_blank">
                                            <SvgIcon width={`2.5em`} {...{ id: l.name || 'linkicon  ' }} />
                                        </a>
                                    )}

                                </div>
                            </li>
                        )
                    })}
                    <li className={styles.join}>
                        <h1>+</h1>
                        <span>{t('group.join')}</span>
                        <div className={styles.icons}>
                            <a href={`mailto:${config.contact.email}`} rel="noreferrer" target="_blank">
                                <SvgIcon width={`2.5em`}{...{ id: 'email' }} />
                            </a>
                            <a href={config.contact.facebook} rel="noreferrer" target="_blank">
                                <SvgIcon width={`2.5em`} {...{ id: 'facebook' }} />
                            </a>
                        </div>

                    </li>
                </ul>
                <div className={styles.joinText}>
                        {t('group.contactUs')}: <br />
                    <a href={`mailto:${config.contact.email}`}>{config.contact.email}</a><br />
                        {t('w.or')}<br />
                    <a target="_blank" rel="noreferrer" href={`${config.contact.facebook}`}>{config.contact.facebook}</a><br />
                </div>
                </div>
            </div>
        </div>
    )
}

export default ModalContent