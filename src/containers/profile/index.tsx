import { FormikProvider, Form, useFormik } from 'formik';
import React, { useContext, useRef } from 'react';
import { useAppSelector } from '@store/selectors';
import { useDispatch } from 'react-redux';
import { UserActionType } from '@store/branches/user/enums';
import authContext from '@contexts/AuthContext';
import { Button } from 'primereact/button';
import InputControl from '@components/InputControl';
import { Card } from 'primereact/card';
import AddressDetails from '@components/AddressDetails';

const Profile = () => {
	const userDetails = useAppSelector(state => state.user.user);
	const profileImageRef = useRef<HTMLInputElement>(null);

	const { setUser } = useContext(authContext) as any;
	const dispatch = useDispatch();

	const refreshData = () => {
		dispatch({
			type: UserActionType.FETCH_USER_DETAILS,
			payload: {
				successCB: userRes => {
					setUser(userRes);
				}
			}
		});
	};

	const updateUser = (values: any, { setSubmitting }: any) => {
		dispatch({
			type: UserActionType.UPDATE_USER_DETAILS,
			payload: {
				formData: { ...values },
				successCB: () => {
					setSubmitting(false);
					refreshData();
				}
			}
		});
	};

	const userDetailsForm = useFormik({
		initialValues: { ...userDetails },
		enableReinitialize: true,
		onSubmit: updateUser
		// validationSchema: updateProfileDetailsSchema
	});
	const permanentAddressTag = `permanentAddress`;

	const updateProfilePicture = event => {
		dispatch({
			type: UserActionType.UPDATE_PROFILE_PICTURE,
			payload: {
				file: event.target.files,
				successCB: () => {
					refreshData();
				}
			}
		});
	};

	return (
		<FormikProvider value={userDetailsForm}>
			<Form>
				<Card className="p-4">
					{/* <div className="flex flex-col items-center mb-4">
						<label className="font-bold mb-2 capitalize">Profile Picture:</label>
						<div className="group relative rounded-full bg-gray-800 p-0 ">
							<img
								src={userDetails?.profilePicture?.documentUrl}
								alt="Profile"
								className="w-32 h-32 object-cover rounded-full group-hover:opacity-30 p-0.5 "
							/>
							<button
								className="invisible group-hover:visible absolute cursor-pointer inset-0 text-white"
								onClick={() => profileImageRef.current?.click()}
								type="button"
							>
								Change
							</button>
							<input
								type="file"
								className="hidden"
								ref={profileImageRef}
								onChange={updateProfilePicture}
							/>
						</div>
					</div> */}
					<div className="grid sm:grid-cols-2 gap-4">
						<InputControl
							label="Full Name"
							type="text"
							inplace
							formObj={userDetailsForm}
							tag="fullName"
							mandatory
						/>
						<InputControl
							label="Email"
							inplace
							type="text"
							formObj={userDetailsForm}
							tag="email"
							mandatory
						/>
						<InputControl
							label="Phone Number"
							inplace
							type="text"
							formObj={userDetailsForm}
							tag="phoneNumber"
							mandatory
						/>
						<InputControl
							label="Alternate Phone Number"
							inplace
							type="text"
							formObj={userDetailsForm}
							tag="alternatePhoneNumber"
						/>
					</div>
				</Card>
				<Card className="mt-4 font-bold p-4" header="Address">
					<div className="flex flex-col">
						<div>
							<AddressDetails formObj={userDetailsForm} tag={permanentAddressTag} removeCoordinate />
						</div>
						{/* <Divider layout="vertical" className="hidden md:block" /> */}
						{/* <div>
								<div className="flex justify-between ">
									<h2 className="font-bold">Mailing Address</h2>
									<Button
										link
										type="button"
										label="Copy from Permanent Address"
										onClick={() => {
											userDetailsForm.setFieldValue(mailingAddressTag, values.permanentAddress);
										}}
										className="p-0"
									/>
								</div>
								<AddressDetails
									formObj={userDetailsForm}
									tag={mailingAddressTag}
									// removeCoordinate
								/>
							</div> */}
					</div>
				</Card>
				<div className="flex justify-end">
					<Button type="submit" className="order-3 mt-4 items-center justify-center ">
						Update Profile Details
					</Button>
				</div>
			</Form>
		</FormikProvider>
	);
};

export default Profile;
