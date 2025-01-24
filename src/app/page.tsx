"use client";
import { useState, useEffect} from "react";

type Task={
  id:number;
  title:string;
  completed:boolean;
};

export default function Home() {
  const [tasks,setTasks]=useState<Task[]>([]);
  const [newTask,setNewTask]=useState("");

  useEffect(()=>{
    const data=localStorage.getItem("tasks");
    setTasks(JSON.parse(data));
  },[]);
  useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks));
  },[tasks]);

  const addTask=()=>{
    //trim()関数は文字列の前後の空白を削除するので、空文字（または空白文字のみ）の場合はreturnで関数を終了
    if(!newTask.trim()) return;
    const newTaskOBJ:Task={
      id:tasks.length+1,
      title:newTask,
      completed:false
    };
    //prevは現在の状態を指す
    //setTasksの中身をコピーして新しいオブジェクトを追加している。
    setTasks((prev)=>[...prev,newTaskOBJ]);

    setNewTask("");
  }

  const deleteTask=()=>{
    //filter((task)=>true)
    //trueなら残る、falseなら落ちる
    setTasks((prevTasks)=>prevTasks.filter((task)=>!task.completed));
  }

  const toggleTask=(id:number)=>{
    setTasks((prevTasks)=>
      prevTasks.map((task)=>
        //...はスプレット構文でオブジェクトtaskをコピーする（不変性を維持するため）
        task.id===id ? {...task,completed:!task.completed}:task 
      )
    );
  };
  
  
  return (
    //input > onChangeは入力毎に指定の関数を実行する
    //(e)はイベントオブジェクト、inputの状態を取得できる。
    //この場合、入力された文字をsetNewTasksの引数に当てている。
    //flex justify-center items-center
    <div>
      <h1 className="text-4xl my-10">Tasks</h1>
      <form action={addTask} className="my-8">
        <input
          className="border border-gray-400 rounded-lg px-4 h-10"
          type="text"
          value={newTask}
          onChange={(e)=>setNewTask(e.target.value)}
          placeholder="New Task"
        />
        <button onClick={addTask} className="w-16 h-10 rounded-lg mx-4 bg-black text-white">Add</button>
        <button onClick={deleteTask} className="w-16 h-10 rounded-lg bg-white text-black border-2">Delete</button>
      </form>
      <ul>
        {
          tasks.map((task)=>
            <li key={task.id} className="bg-white/80 rounded-lg shadow-lg w-80 h-20 mx-auto my-4 flex justify-center items-center">
              <label className="text-2xl"><input
                  className="mr-4 size-4"
                  type="checkbox"
                  checked={task.completed}
                  onChange={()=>toggleTask(task.id)}
                />{task.title}
              </label>
            </li>
          )
        }
      </ul>
    </div>
  );
}
