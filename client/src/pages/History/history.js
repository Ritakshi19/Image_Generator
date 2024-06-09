
import React, { useEffect, useState } from 'react';
import './history.css';
import Navbar from '../common/Navbar/navbar';

const History = (props) => {
    const { userPoints, setUserPoints } = props;
    const API_ENDPOINT = `${process.env.BACKEND_URL}/api/v1/images`;

    const [userHistory, setUserHistory] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?._id;
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUserHistory = async () => {
            try {
                const response = await fetch(`${API_ENDPOINT}?userId=${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);
                setUserHistory(data);
            } catch (error) {
                console.error('Error fetching user history:', error);
            }
        };

        if (userId && token) {
            fetchUserHistory();
        }
    }, [API_ENDPOINT, userId, token]);

    return (
        <div>
            <Navbar page='history' />
            <div className="history-container">
                {userHistory.length > 0 ? (
                    userHistory.map((item, index) => (
                        <div key={index} className="history-item">
                            <img src={item.imageUrl} alt="History item" />
                            <p>{item.searchText}</p>
                        </div>
                    ))
                ) : (
                    <p className="no-history">No history available</p>
                )}
            </div>
        </div>
    );
};

export default History;
