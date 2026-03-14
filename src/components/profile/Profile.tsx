import {useState} from "react";
import {Avatar, Button, Tabs, Tab} from "@heroui/react";
import Dialog from "../Dialog";
import UploadProfile from "./UploadProfile";
import {useAuth} from "../../hooks/useAuth";
import ChangePassword from "../auth/ChangePassword";

const Profile = () => {
    const {user} = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [changePass, setChangePass] = useState(false);

    return (
        <div className="block sm:flex items-center flex-col space-y-3 max-w-7xl py-5 px-5 sm:px-8 w-full mx-auto">
            <div className="flex gap-2 justify-center sm:justify-start">
                <div className="flex flex-col items-center gap-2">
                    <Avatar
                        showFallback 
                        name={user?.username}
                        src={user?.avatar}
                        className="w-30 h-30 text-4xl"
                    />
                    <Button 
                        onPress={() => setIsOpen(true)}
                        className="bg-gray-900 text-white h-fit py-1 rounded-md">
                        CHANGE PROFILE
                    </Button> 
                </div>
            </div>

            <div className="flex flex-col justify-center sm:justify-start w-full">
                <Tabs aria-label="Options" variant="underlined" fullWidth className="block sm:flex flex-col">
                    <Tab key="photos" title="Personal" className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-2xl text-gray-700 font-semibold">Personal Details:</h2>
                            <div>
                                <span className="">
                                    <span>
                                        <span className="text-gray-500">Username: </span>
                                        <span className="font-semibold text-gray-600">
                                            {user?.username}
                                        </span>
                                    </span>
                                </span>
                            </div>

                            <div>
                                <span className="">
                                    <span>
                                        <span className="text-gray-500">Email: </span>
                                        <span className="font-semibold text-gray-600">
                                            {user?.email}
                                        </span>
                                    </span>
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <Button 
                                className="rounded-md h-fit py-2 text-gray-700 w-fit"
                                onPress={() => setChangePass(!changePass)}
                            >
                                {changePass ? 'Return' : 'Change password'}
                            </Button>

                            {changePass && (
                                <div className="max-w-xs">
                                    <ChangePassword />
                                </div>
                            )}
                        </div>
                    </Tab>
                    <Tab key="music" title="Posts" className="w-full text-center text-gray-400">
                        Feature will be available soon!
                    </Tab>
                    <Tab key="videos" title="Liked Posts" className="text-center text-gray-400">
                        Feature will be available soon!
                    </Tab>
                </Tabs>

            </div>

            <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <UploadProfile onClose={() => setIsOpen(false)} />
            </Dialog>
        </div>
    )
}

export default Profile

