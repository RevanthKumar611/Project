import React, { useState, useEffect, useRef } from 'react';
import './Captcha.css';

const Captcha = ({ onVerify }) => {
    const [code, setCode] = useState('');
    const [userInput, setUserInput] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const canvasRef = useRef(null);

    const createCaptcha = () => {
        const charsArray = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
        const lengthOtp = 6;
        let captcha = [];
        
        for (let i = 0; i < lengthOtp; i++) {
            const index = Math.floor(Math.random() * charsArray.length);
            if (captcha.indexOf(charsArray[index]) === -1) {
                captcha.push(charsArray[index]);
            } else {
                i--;
            }
        }

        const captchaCode = captcha.join("");
        setCode(captchaCode);
        setUserInput('');
        setIsVerified(false);
        onVerify(false);

        // Draw on canvas
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Set background
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw captcha text with effects
            ctx.font = 'bold 24px Arial';
            ctx.fillStyle = '#2f66f5';
            
            // Add some distortion
            for (let i = 0; i < captchaCode.length; i++) {
                const x = 10 + i * 15;
                const y = 30 + Math.random() * 10 - 5;
                const rotation = Math.random() * 0.4 - 0.2;
                
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(rotation);
                ctx.fillText(captchaCode[i], 0, 0);
                ctx.restore();
            }
            
            // Add some noise
            ctx.strokeStyle = '#e0e0e0';
            for (let i = 0; i < 20; i++) {
                ctx.beginPath();
                ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
                ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
                ctx.stroke();
            }
        }
    };

    useEffect(() => {
        createCaptcha();
    }, []);

    const handleInputChange = (e) => {
        const input = e.target.value;
        setUserInput(input);
        
        if (input.toLowerCase() === code.toLowerCase()) {
            setIsVerified(true);
            onVerify(true);
        } else {
            setIsVerified(false);
            onVerify(false);
        }
    };

    const handleRefresh = () => {
        createCaptcha();
    };

    const validateCaptcha = (e) => {
        e.preventDefault();
        if (userInput.toLowerCase() === code.toLowerCase()) {
            setIsVerified(true);
            onVerify(true);
            alert('CAPTCHA verified successfully!');
        } else {
            setIsVerified(false);
            onVerify(false);
            alert('Invalid CAPTCHA. Please try again.');
            createCaptcha();
        }
    };

    return (
        <div className="captcha-container">
            <div className="captcha-header">
                <label>CAPTCHA Verification</label>
                <button 
                    type="button" 
                    className="captcha-refresh"
                    onClick={handleRefresh}
                    title="Refresh CAPTCHA"
                >
                    <i className="fas fa-redo"></i>
                </button>
            </div>
            
            <div className="captcha-display">
                <div className="captcha-canvas-container">
                    <canvas 
                        ref={canvasRef}
                        width="150"
                        height="50"
                        className="captcha-canvas"
                    />
                </div>
            </div>

            <div className="captcha-input-group">
                <input
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    placeholder="Enter the text you see above"
                    className="captcha-input"
                    required
                />
                
                <div className="captcha-status">
                    {isVerified ? (
                        <span className="captcha-success">
                            <i className="fas fa-check"></i> Verified
                        </span>
                    ) : (
                        <span className="captcha-pending">
                            Enter the CAPTCHA text
                        </span>
                    )}
                </div>

                <button 
                    type="button" 
                    className="btn btn-secondary captcha-verify-btn"
                    onClick={validateCaptcha}
                >
                    Verify CAPTCHA
                </button>
            </div>
        </div>
    );
};

export default Captcha;