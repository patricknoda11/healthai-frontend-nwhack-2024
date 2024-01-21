import React, { useCallback, useContext, useState } from 'react';
import { Row, Col, Button, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { HiArrowUp } from "react-icons/hi";

// Import Styles:
import './message-input.scss';

// Import Other:
import { AppContextType, AppContext } from '../../contexts/message-log-context';

// Import Types:
import { AssistantResponseStage, Message } from '../../types/message';
import { RESPONSE_STATUS, sendAssessmentAnswers, sendMessage } from '../../services/services';

function questionsLeft(qs: {[key: string]: string}): number {
    let count = 0;
    Object.keys(qs).map((key) => {
        if (qs[key] === '') {
            count++;
        }
    });
    return count;
}
/**
 * Reuasuable Message Input Component
 */
const MessageInput: React.FC = ({}) => {
    const context: AppContextType | null = useContext(AppContext);

    const [messageApi, ] = message.useMessage();

    const [value, setValue] = useState<string>('');

    const [assessQustion, setAssessQuestion] = useState<string>('');

    const onSubmitHandler = useCallback(async () => {
        console.log(JSON.stringify(context?.assassingQuestions));

        // Add User Input to Message Log:
        const message: Message = { role: 'user', content: value };
        const temp = JSON.parse(JSON.stringify(context?.messages));

        context?.addToMessageLog(message);

        // Reset User Input:
        setValue('');

        // 
        if (context?.stage === AssistantResponseStage.Asessing) {
            const response = await sendMessage(message, temp);

            if (response.status === RESPONSE_STATUS.Success) {
                const assistantResponseObj = response.data as {response: string, questions: string[]};

                context?.addToMessageLog({role: 'assistant', content: assistantResponseObj.response});
                context?.setStage(AssistantResponseStage.Questioning);

                // Store assassing questions:
                if (assistantResponseObj.questions.length > 0) {
                    const questionDict: {[key: string]: string} = {};
                    assistantResponseObj.questions.map((question) => {
                        questionDict[question] = '';
                    });
                    context?.setAssassingQuestions(questionDict);

                    setAssessQuestion(Object.keys(questionDict)[0]);
                    context?.addToMessageLog({role: 'assistant', content: Object.keys(questionDict)[0]});
                }
            } else {
                const errorMessage = response.data as string;

                messageApi.open({
                    type: 'error',
                    content: errorMessage,
                  });
            }
        }
        else if (context?.stage === AssistantResponseStage.Questioning) {
            if (questionsLeft(context?.assassingQuestions ?? {}) === 0) {
                console.log("Answered all questions");
                    const response = await sendAssessmentAnswers(context?.assassingQuestions ?? {}, context?.messages ?? []);
                    console.log(response);

                    if (response.status === RESPONSE_STATUS.Success) {
                        const assistantResponse = response.data as string;

                        context?.addToMessageLog({role: 'assistant', content: assistantResponse});
                        context?.setStage(AssistantResponseStage.Instructing);
                    } else {
                        const errorMessage = response.data as string;

                        messageApi.open({
                            type: 'error',
                            content: errorMessage,
                          });
                    }
                
            
            } else {
                const assessingQuestionsCopy = JSON.parse(JSON.stringify(context?.assassingQuestions));
                assessingQuestionsCopy[assessQustion] = value;
                context?.setAssassingQuestions(assessingQuestionsCopy);

                const unanwseredQuestion: string = Object.keys(assessingQuestionsCopy).find((key) => {
                    if (assessingQuestionsCopy[key] === '') {
                        setAssessQuestion(key);
                        return true;
                    }
                    return false;
                }) as string;

                if (questionsLeft(assessingQuestionsCopy) > 0) {
                    context?.addToMessageLog({role: 'assistant', content: unanwseredQuestion});
                }
                else {
                    console.log("Answered all questions");
                    const response = await sendAssessmentAnswers(context?.assassingQuestions ?? {}, context?.messages ?? []);

                    console.log(response);
                    if (response.status === RESPONSE_STATUS.Success) {
                        const assistantResponse = response.data as string;

                        context?.addToMessageLog({role: 'assistant', content: assistantResponse});
                        context?.setStage(AssistantResponseStage.Instructing);
                    } else {
                        const errorMessage = response.data as string;

                        messageApi.open({
                            type: 'error',
                            content: errorMessage,
                          });
                    }
                }
            }
        }


    }, [value, context]);

    return (
        <Row className="message-input-container">
            <Col span={12}>
                <TextArea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    autoSize={{ minRows: 1, maxRows: 6 }}
                />
            </Col>
            <Col span={4}>
                <Button
                    type="primary"
                    shape="round"
                    icon={<HiArrowUp/>}
                    disabled={!value}
                    onClick={onSubmitHandler}
                />
            </Col>
        </Row>
    );
};

export default MessageInput;