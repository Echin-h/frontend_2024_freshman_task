import React, { useEffect, useState } from 'react';
import axios from "axios";
import './index.css';


const QuestionForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description) {
            alert("Please fill in both title and description.");
        }

        setTitle('');
        setDescription('');
    }

    return (
        <div>
            <h1>
                QuestionForm is working
            </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title"
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

const QuestionList = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedSet, setExpandedSet] = useState(new Set());  // 用于跟踪展开的问题 ID

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('https://hduhelp.woshiluo.com/api/question');
                if (Array.isArray(response.data)) {
                    setQuestions(response.data.slice(0, 20));  // 只设置前 20 个问题
                } else if (response.data && Array.isArray(response.data.questions)) {
                    setQuestions(response.data.questions);
                } else {
                    console.error('Unexpected data format:', response.data);
                    setQuestions([]);
                }
            } catch (err) {
                console.error('Error fetching questions:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    // 切换问题的展开/折叠状态
    const toggleAnswerVisibility = (id) => {
        const newSet = new Set(expandedSet);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setExpandedSet(newSet);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="question-list">
            <h1>Questions List</h1>
            {questions.length === 0 ? (
                <div>No questions available</div>
            ) : (
                <ul>
                    {questions.map((question) => (
                        <li className="question" key={question.id}>
                            <h2>{question.title}</h2>
                            <div className="question-details">
                                <p>{question.detail}</p>
                                <p className="author-info">Author: {question.author}</p>
                                <p className="author-info">Email: {question.author_email}</p>
                                <p className="author-info">Created at: {new Date(question.created_at).toLocaleString()}</p>
                            </div>
                            <h4 onClick={() => toggleAnswerVisibility(question.id)}>
                                Answers {expandedSet.has(question.id) ? '-' : '+'}
                            </h4>
                            {expandedSet.has(question.id) && (
                                <ul className="answers">
                                    {question.answers.map((answer) => (
                                        <li className={`answer ${answer.is_best ? 'best-answer' : ''}`} key={answer.id}>
                                            <p>{answer.content}</p>
                                            <p className="author-info">Author: {answer.author_name}</p>
                                            <p className="author-info">Email: {answer.author_email}</p>
                                            <p className="author-info">Created at: {new Date(answer.created_at).toLocaleString()}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export {QuestionForm, QuestionList};