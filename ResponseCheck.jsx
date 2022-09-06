import React,{useState , useRef}from 'react';

const ResponseCheck = () =>{
    const [state,setState] = useState('waiting');
    const [message,setMessage] = useState('클릭해서 시작하세요');
    const [result,setResult] = useState([]);// useState는 값이 바뀌면 render 됨
    const timeout = useRef(null); // useRef는 값이 바뀌어도 render 되지 않음
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen = () =>{
        if(state === 'waiting'){
            setState('ready');
            setMessage('초록색이 되면 클릭하세요');
           timeout.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭');
                startTime.current = new Date();
            },Math.floor(Math.random() * 1000) + 2000); // 2초 -> 3초 랜덤
        } else if(state === 'ready'){
            clearTimeout(timeout.current);
            setState('waiting');
            setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요');
        } else if(state === 'now'){
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요');
            setResult((prevResult) => {
            return[...prevResult, endTime.current - startTime.current];
            });
        }
    }
    
    const renderAverage = () => {
        return result.length === 0 
            ? null 
            : <> 
            <div>평균 시간: {result.reduce((a,c)=>a + c) / result.length}ms</div>       
            <button onClick={onRest}>리셋</button>
           </>
    };

    const onRest = () => {
        setResult([]);
    };

    return (
        <>
        <div 
        id = "screen" 
        className={state} 
        onClick={onClickScreen}
        >
        {message}
        </div>
        {(() => {
            if(result.length === 0){
                return null;
            } else {
                return <> 
                <div>평균 시간: {result.reduce((a,c)=>a + c) / result.length}ms</div>       
                <button onClick={onRest}>리셋</button>
               </>
            }
        })()} 
        {/* 즉시 실행 함수를 만들어서 안에서 if else 쓰기
        {renderAverage()} */}
        </>
    );
};




export default ResponseCheck;