import { useContext, useState } from "react";
import { X, Check, ArrowRight } from "lucide-react";
import Input from "./Input";
import { ApiContext } from "../contexts/AxiosContext";
import { UserInfoContext } from "../contexts/UserInfo";
import { useNavigate } from "react-router-dom";

function SplitsGroupForm(props) {
    const [formData, setFormData] = useState({
        groupName: '',
        members: new Set()
    });
    const [memberName, setMemberName] = useState('');

    const api = useContext(ApiContext);
    const navigate = useNavigate();
    const { setGroupList } = useContext(UserInfoContext);

    const handleSubmit = () => {
        const payload = {
            ...formData,
            members: [...formData.members]
        };

        api.post('/users/splits/createGroup', payload)
            .then((res) => {
                setGroupList(prev => ([res.data.response.group, ...prev]));
                navigate(`/splits/${res.data.response.group._id}`);
                props.cut();
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <>
            <div className="absolute top-0 left-0 w-full h-full backdrop-blur-[1px] z-10"></div>
            <div className="flex flex-col w-[350px] h-[420px] bg-charcol-primary border-2 border-charcol-light p-10 rounded-xl shadow-primary items-center absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-200 cursor-pointer"
                    onClick={props.cut}
                >
                    <X />
                </div>
                <div className="w-full flex justify-center items-center">
                    <h1 className="uppercase text-white font-bold text-xl mb-2">Create Group</h1>
                </div>
                <div className="w-full flex flex-col gap-3 justify-center items-center">
                    <div className="w-full">
                        <Input
                            placeholder="Group Name"
                            type="text"
                            name="groupName"
                            onChange={(e) => {
                                setFormData(prev => ({
                                    ...prev,
                                    groupName: e.target.value
                                }));
                            }}
                        />
                    </div>
                    <div className="w-full flex justify-center items-center gap-2">
                        <Input
                            placeholder="Member"
                            type="text"
                            name="memberName"
                            value={memberName}
                            onChange={(e) => setMemberName(e.target.value)}
                        />
                        <div
                            className="text-gray-400 rounded-full p-1 bg-charcol-light shadow-primary cursor-pointer hover:text-white"
                            onClick={() => {
                                if (memberName.trim()) {
                                    setFormData(prev => {
                                        const updatedMembers = new Set(prev.members);
                                        updatedMembers.add(memberName.trim());

                                        return {
                                            ...prev,
                                            members: updatedMembers
                                        };
                                    });
                                    setMemberName('');
                                }
                            }}
                        >
                            <Check />
                        </div>
                    </div>
                    <button
                        className="text-charcol-darker bg-brand-primary rounded-full p-2 shadow-primary absolute right-2 bottom-2 cursor-pointer"
                        onClick={handleSubmit}
                    >
                        <ArrowRight size={20} />
                    </button>
                </div>
                <div className="w-full py-2 flex flex-col overflow-y-auto">
                    <p className="w-full border-b border-gray-400 text-white text-sm">
                        Members ({formData.members.size})
                    </p>

                    <div className="pr-5 flex flex-col h-full overflow-y-auto mt-1 gap-1">
                        {[...formData.members].reverse().map((member) => (
                            <div
                                key={member}
                                className="flex bg-charcol-dark px-2 py-1 justify-between items-center"
                            >
                                <p className="text-brand-primary text-sm">{member}</p>

                                <div
                                    className="text-gray-400 hover:text-white cursor-pointer"
                                    onClick={() => {
                                        setFormData(prev => {
                                            const updatedMembers = new Set(prev.members);
                                            updatedMembers.delete(member);

                                            return {
                                                ...prev,
                                                members: updatedMembers
                                            };
                                        });
                                    }}
                                >
                                    <X size={16} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SplitsGroupForm;