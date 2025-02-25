import { CustomerActionType } from '@store/branches/customer/enums';
import { useAppSelector } from '@store/selectors';
import { OTP_REGEX, PHONE_REGEX, toast } from '@utilities';
import { ErrorMessage, Form, FormikProvider, useFormik } from 'formik';
import { Button } from 'primereact/button';
import { InputOtp } from 'primereact/inputotp';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import QuotationGeneratingImage from '@assets/images/customer/Quotaion-Generate-Img.png';
import PremiumProductsImage from '@assets/images/customer/premium-products.png';
import WarrantyImage from '@assets/images/customer/warranty.png';
import HandoverImage from '@assets/images/customer/handover.png';

const Login = ({ onSuccess }: any) => {
	const [sendOTPLoading, setSendOTPLoading] = useState(false);
	const [verifyOTPLoading, setVerifyOTPLoading] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const [resendTimer, setResendTimer] = useState(30);
	const dispatch = useDispatch();
	const { sessionID } = useAppSelector(state => state.customer);

	useEffect(() => {
		let timer;
		if (resendTimer > 0) {
			timer = setInterval(() => {
				setResendTimer(prev => prev - 1);
			}, 1000);
		}
		return () => clearInterval(timer);
	}, [resendTimer]);

	const resetTimer = () => {
		setResendTimer(30);
	};

	const sendOTP = values => {
		setSendOTPLoading(true);
		dispatch({
			type: CustomerActionType.SEND_CUSTOMER_OTP,
			payload: {
				leadDetails: { ...values },
				successCB: () => {
					setActiveIndex(1);
					verifyOTPForm.setFieldValue('phoneNumber', values.phoneNumber);
					resetTimer();
					toast('SUCCESS', 'OTP has been sent to your number');
					setSendOTPLoading(false);
				},
				errorCB: message => {
					setSendOTPLoading(false);
					toast('ERROR', message);
				}
			}
		});
	};

	const verifyOTP = (values: any) => {
		setVerifyOTPLoading(true);
		dispatch({
			type: CustomerActionType.VERIFY_CUSTOMER_OTP,
			payload: {
				sessionID,
				verifyOTPDetails: { ...values },
				successCB: (): void => {
					onSuccess();
					dispatch({ type: CustomerActionType.SET_LEAD_NAME, payload: sendOTPForm?.values?.name });
					setVerifyOTPLoading(false);
				},
				errorCB: message => {
					setVerifyOTPLoading(false);
					toast('ERROR', message);
				}
			}
		});
	};

	const sendOTPForm = useFormik({
		initialValues: { phoneNumber: '', name: '' },
		validationSchema: Yup.object().shape({
			phoneNumber: Yup.string()
				.required('Mobile Number is required')
				.matches(PHONE_REGEX, 'Invalid phone number'),
			name: Yup.string().required('Full Name is required')
		}),
		onSubmit: sendOTP
	});

	const verifyOTPForm = useFormik({
		initialValues: { phoneNumber: '', otp: '' },
		validationSchema: Yup.object().shape({
			otp: Yup.string().required('OTP is required').matches(OTP_REGEX, 'Invalid OTP')
		}),
		onSubmit: verifyOTP
	});

	return (
		<div className="grid grid-col-1 lg:grid-cols-[60%,40%] w-full h-full">
			<section
				style={{ backgroundImage: `url(${QuotationGeneratingImage})` }}
				className="bg-cover bg-center h-full flex flex-col lg:gap-8 p-8 bg-cyan-900 text-white gap-2 overflow-scroll"
			>
				<div className="flex flex-col text-center py-4 px-4 xl::py-16 xl:px-32 gap-2">
					<p className="text-5xl font-semibold plus-jakarta-sans-font text-nowrap">Reduce your wait time.</p>
					<p className="text-5xl font-semibold plus-jakarta-sans-font">Let&apos;s Connect.</p>
				</div>
				<div className="flex gap-12 px-12 xl:px-24 justify-center items-center plus-jakarta-sans-font font-normal">
					<span className="flex flex-col justify-center items-center">
						<img src={PremiumProductsImage} height={72} width={72} />
						<p className="text-center">Premium Products & Finishing</p>
					</span>
					<span className="flex flex-col justify-center items-center">
						<img src={WarrantyImage} height={72} width={72} />
						<p className="text-center">Warranty Life on products</p>
					</span>
					<span className="flex flex-col justify-center items-center">
						<img src={HandoverImage} height={72} width={72} />
						<p className="text-center">Project handover in 45 days*</p>
					</span>
				</div>
			</section>

			<section className="flex pl-12 pr-10 pt-28 bg-white h-full overflow-scroll">
				<div className="w-full space-y-6 h-full flex justify-between">
					{activeIndex === 0 && (
						<FormikProvider value={sendOTPForm}>
							<Form className="flex flex-col justify-between w-full gap-4" noValidate>
								<div className="flex flex-col gap-8">
									<h2 className="text-xl font-medium md:text-5xl plus-jakarta-sans-font">
										Login to continue
									</h2>
									<div className="flex flex-col gap-2">
										<label className="text-sm font-medium text-[#23232399]" htmlFor="name">
											Full Name*
											<InputText
												value={sendOTPForm.values.name}
												onChange={e => sendOTPForm.setFieldValue('name', e.target.value)}
												id="name"
												className="mt-2 w-full appearance-none rounded-md border px-3 py-2 leading-tight text-gray-700 focus:outline-none hover:border-black  focus:ring focus:ring-black"
											/>
											<ErrorMessage className="error-msg" component="div" name="name" />
										</label>

										<label className="text-sm font-medium text-[#23232399]" htmlFor="phoneNumber">
											Mobile Number*
											<InputText
												value={sendOTPForm.values.phoneNumber}
												keyfilter="int"
												maxLength={10}
												onChange={e => sendOTPForm.setFieldValue('phoneNumber', e.target.value)}
												id="phoneNumber"
												className="mt-2 w-full appearance-none rounded-md border px-3 py-2 leading-tight text-gray-700 focus:outline-none hover:border-black  focus:ring focus:ring-black"
											/>
											<ErrorMessage className="error-msg" component="div" name="phoneNumber" />
										</label>
									</div>
								</div>
								<div>
									<Button
										type="submit"
										label="Send OTP"
										loading={sendOTPLoading}
										className="px-16 py-3 bg-black text-white rounded-none"
									/>
								</div>
							</Form>
						</FormikProvider>
					)}

					{activeIndex === 1 && (
						<FormikProvider value={verifyOTPForm}>
							<Form className="flex flex-col justify-between w-full gap-4" noValidate>
								<div className="flex flex-col gap-8">
									<h2
										className="text-xl font-medium md:text-5xl plus-jakarta-sans-font"
										style={{ whiteSpace: 'nowrap' }}
									>
										Login to continue
									</h2>
									<div className="flex flex-col gap-2">
										<label className="text-sm font-medium text-[#23232399]" htmlFor="name">
											Full Name*
											<InputText
												value={sendOTPForm.values.name}
												disabled
												id="name"
												className="mt-2 w-full appearance-none rounded-md border px-3 py-2 leading-tight text-gray-700 focus:outline-none hover:border-black  focus:ring focus:ring-black"
											/>
										</label>
										<label className="text-sm font-medium text-[#23232399]" htmlFor="phoneNumber">
											<div className="flex justify-between">
												<span>Phone Number*</span>
												<span
													className="hover:underline"
													onClick={() => {
														setActiveIndex(activeIndex - 1);
														sendOTPForm.values.phoneNumber = '';
														verifyOTPForm.setFieldValue('otp', '');
													}}
												>
													Change Number
												</span>
											</div>
											<InputText
												value={sendOTPForm.values.phoneNumber}
												keyfilter="int"
												disabled
												id="phoneNumber"
												className="mt-2 w-full appearance-none rounded-md border px-3 py-2 leading-tight text-gray-700 focus:outline-none hover:border-black  focus:ring focus:ring-black"
											/>
										</label>

										<label className="text-sm font-medium text-[#23232399]" htmlFor="otp">
											OTP*
											<div>
												<InputOtp
													value={verifyOTPForm.values.otp}
													length={6}
													integerOnly
													pt={{
														root: {
															className:
																'flex mb-4 w-full rounded-md py-2 leading-tight text-gray-700 [&>input]:w-full'
														}
													}}
													onChange={e => {
														verifyOTPForm.setFieldValue('otp', e.value);
													}}
												/>

												{resendTimer > 0 ? (
													<span className="text-sm font-semibold">
														Resend OTP in {resendTimer}s
													</span>
												) : (
													<button
														type="button"
														onClick={() => {
															sendOTPForm.handleSubmit();
															resetTimer();
														}}
														className="text-sm text-black font-normal cursor-pointer"
													>
														Resend OTP
													</button>
												)}
											</div>
										</label>
									</div>
								</div>

								<div>
									<Button
										type="submit"
										label="Verify OTP"
										loading={verifyOTPLoading}
										className="px-16 py-3 bg-black text-white rounded-none"
									/>
								</div>
							</Form>
						</FormikProvider>
					)}
				</div>
			</section>
		</div>
	);
};

export default Login;
