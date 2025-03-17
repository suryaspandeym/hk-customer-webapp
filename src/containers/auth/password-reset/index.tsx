import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { Routes } from '@utilities';
import { AuthActionType } from '@store/enums';
import { PasswordResetForm } from '@components';

export const PasswordReset: React.FunctionComponent = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<PasswordResetForm
			onSubmit={(payload: any): void => {
				dispatch({
					type: AuthActionType.PASSWORD_RESET_REQUEST,
					payload: {
						...payload,
						redirect: (): void => navigate(Routes.LOGIN)
					}
				});
			}}
		>
			<p className="c-form__hint">
				{t('You can also')} <Link to={Routes.SIGNUP}>{t('Sign up')}</Link> {t('or')}{' '}
				<Link to={Routes.LOGIN}>{t('Login')}</Link>
			</p>
		</PasswordResetForm>
	);
};

export default PasswordReset;
