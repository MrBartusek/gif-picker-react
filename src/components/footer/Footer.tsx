import React, { useContext } from 'react';
import SettingsContext from '../../context/SettingsContext';
import { Theme } from '../../GifPickerReact';
import useAttribution from '../../hooks/useAttribution';
import './Footer.css';

function Footer(): React.JSX.Element | null {
	const settings = useContext(SettingsContext);
	const { branding } = useAttribution();

	if (!branding) {
		return null;
	}

	const logo = settings.theme === Theme.DARK ? (branding.logoDark ?? branding.logo) : branding.logo;

	return (
		<div className="gpr-footer">
			<a
				className="gpr-footer-link"
				href={branding.href}
				target="_blank"
				rel="noreferrer"
			>
				<img
					className="gpr-footer-logo"
					src={logo}
					alt={branding.alt ?? ''}
				/>
			</a>
		</div>
	);
}

export default Footer;
