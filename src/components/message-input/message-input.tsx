import React, { useCallback, useContext, useState } from 'react';
import { Row, Col, Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { HiArrowUp } from "react-icons/hi";

// Import Styles:
import './message-input.scss';

// Import Other:
import { MessageLogContextType, MessageLogContext } from '../../contexts/message-log-context';

// Import Types:
import { Message } from '../../types/message';

/**
 * Reuasuable Message Input Component
 */
const MessageInput: React.FC = ({}) => {
    const context: MessageLogContextType | null = useContext(MessageLogContext);
    
    const [value, setValue] = useState<string>('');

    const onSubmitHandler = useCallback(() => {
        // Add User Input to Message Log:
        const message: Message = { role: 'user', content: value };
        context?.addToMessageLog(message);

        // Reset User Input:
        setValue('');
    }, [value]);

    return (
        <Row>
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