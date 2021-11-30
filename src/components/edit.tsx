import { useSetRecoilState } from "recoil";
import { todoListState } from "../atoms/states";
import moment from "moment";
import { useForm } from "react-hook-form";

type FormData = {
    id: string
    title: string
    text: string
    isComplete: boolean
}

const Edit: React.FC = () => {
    const setTodoList = useSetRecoilState(todoListState);

    // react-hook-form setting
    const {register, handleSubmit, formState: {errors}, reset} = useForm<FormData>({
        mode: 'onChange',
        defaultValues: {
            id: moment().format('YYYYMMDDHHmmss'),
            title: '',
            text: '',
            isComplete: false,
        }
    })

    // add Todo
    const addTodo = (data: FormData) => {
        setTodoList((oldTodoList) => [
            ...oldTodoList,
            data,
        ]);
        reset()
    }

    return (
        <div>
            <form onSubmit={handleSubmit(addTodo)}>
                <label>title:</label>
                <input
                    type="text"
                    {...register(
                        "title",
                        {
                            required: '必須です',
                            maxLength: {
                                value: 20,
                                message: '20文字以内で入力してください。',
                            },
                        }
                    )}
                />
                {errors.title && <span>{errors.title.message}</span>}
                <br />
                <label>text:</label>
                <input
                    type="text"
                    {...register(
                        "text",
                        {
                            required: '必須です',
                            maxLength: {
                                value: 20,
                                message: '20文字以内で入力してください。',
                            },
                        }
                    )} />
                    {errors.text && <span className="error.main">{errors.text.message}</span>}
                    <br />
                    <button type="submit">送信</button>
            </form>
        </div>
    )
}

export default Edit