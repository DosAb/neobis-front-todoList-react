import { Leva } from 'leva'
import Main from './Main'
import Experience from './scene/Experience'

export default function Application()
{
    return <>
        <div className="canvas">
            <Experience />
        </div>
        <Main />
    </>
}
