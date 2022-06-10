/* eslint-disable */
import {fireEvent, render, screen} from '@testing-library/react';
import LogisticRegressionStepByStep from '../LogisticRegressionStepByStep'


describe('Testing Logistic Regression Introduction Page', () => {
    it("Should render proper user inputs with default values",  () => {
        render(<LogisticRegressionStepByStep />);

        let alphaInput = screen.getByTestId("alphaInput")
        let x11Input = screen.getByTestId("x11Input")
        let x21Input = screen.getByTestId("x21Input")
        let x31Input = screen.getByTestId("x31Input")
        let x12Input = screen.getByTestId("x12Input")
        let x22Input = screen.getByTestId("x22Input")
        let x32Input = screen.getByTestId("x32Input")
        let c1Input = screen.getByTestId("c1Input")
        let c2Input = screen.getByTestId("c2Input")
        let c3Input = screen.getByTestId("c3Input")

        expect(alphaInput).toBeTruthy();
        expect(alphaInput.querySelectorAll('input')[0].value).toBe('0.001')
        expect(x11Input).toBeTruthy();
        expect(x11Input.querySelectorAll('input')[0].value).toBe('0')
        expect(x21Input).toBeTruthy();
        expect(x21Input.querySelectorAll('input')[0].value).toBe('0')
        expect(x31Input).toBeTruthy();
        expect(x31Input.querySelectorAll('input')[0].value).toBe('0');
        expect(x12Input).toBeTruthy();
        expect(x12Input.querySelectorAll('input')[0].value).toBe('0')
        expect(x22Input).toBeTruthy();
        expect(x22Input.querySelectorAll('input')[0].value).toBe('0')
        expect(x32Input).toBeTruthy();
        expect(x32Input.querySelectorAll('input')[0].value).toBe('0');
        expect(c1Input).toBeTruthy();
        expect(c1Input.querySelectorAll('input')[0].value).toBe('0');
        expect(c2Input).toBeTruthy();
        expect(c2Input.querySelectorAll('input')[0].value).toBe('0');
        expect(c3Input).toBeTruthy();
        expect(c3Input.querySelectorAll('input')[0].value).toBe('0');
    })
    it("Should calculate proper sigmoid function",  () => {
        render(<LogisticRegressionStepByStep />);

        let alphaInput = screen.getByTestId("alphaInput").querySelectorAll('input')[0]
        let x11Input = screen.getByTestId("x11Input").querySelectorAll('input')[0]
        let x21Input = screen.getByTestId("x21Input").querySelectorAll('input')[0]
        let x31Input = screen.getByTestId("x31Input").querySelectorAll('input')[0]
        let x12Input = screen.getByTestId("x12Input").querySelectorAll('input')[0]
        let x22Input = screen.getByTestId("x22Input").querySelectorAll('input')[0]
        let x32Input = screen.getByTestId("x32Input").querySelectorAll('input')[0]
        let c1Input = screen.getByTestId("c1Input").querySelectorAll('input')[0]
        let c2Input = screen.getByTestId("c2Input").querySelectorAll('input')[0]
        let c3Input = screen.getByTestId("c3Input").querySelectorAll('input')[0]

        fireEvent.change(alphaInput, { target: { value: 0.101 } })
        fireEvent.change(x11Input, { target: { value: 11 } })
        fireEvent.change(x21Input, { target: { value: 21 } })
        fireEvent.change(x31Input, { target: { value: 31 } })
        fireEvent.change(x12Input, { target: { value: 12 } })
        fireEvent.change(x22Input, { target: { value: 22 } })
        fireEvent.change(x32Input, { target: { value: 32 } })
        fireEvent.change(c1Input, { target: { value: 1 } })
        fireEvent.change(c2Input, { target: { value: 0 } })
        fireEvent.change(c3Input, { target: { value: 1 } })

        expect(alphaInput.value).toBe('0.101')
        expect(x11Input.value).toBe('11')
        expect(x21Input.value).toBe('21')
        expect(x31Input.value).toBe('31');
        expect(x12Input.value).toBe('12')
        expect(x22Input.value).toBe('22')
        expect(x32Input.value).toBe('32');
        expect(c1Input.value).toBe('1');
        expect(c2Input.value).toBe('0');
        expect(c3Input.value).toBe('1');
    })
})