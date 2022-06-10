/* eslint-disable */
import {fireEvent, render, screen} from '@testing-library/react';
import GradientDescentGenericPage1D from "../GradientDescentGenericPage1D";

const visualizationPage = () => {
    return(
        <GradientDescentGenericPage1D
            alphaType='input'
            buttonsType='playGround'
            generateQuestionTable={false}
        />
    )
}
const stepByStepPage = () => {
    return (
        <GradientDescentGenericPage1D
            alphaType='input'
            buttonsType='stepByStep'
            generateQuestionTable={true}
        />
    )
}
const hyperParameterPage = () => {
    return (
        <GradientDescentGenericPage1D
            alphaType='slider'
            buttonsType='hyperParameter'
            generateQuestionTable={false}
        />
    )
}

describe("Testing Gradient Descent 1D Pages", () => {

    describe("Visualization page", () => {
        describe("When page renders", () => {
            it("Should render proper user inputs with default values",  () => {
                render(visualizationPage());

                let funInput = screen.getByTestId("funInput")
                let alphaInput = screen.getByTestId("alphaInput")
                let xInput = screen.getByTestId("xInput")
                let stepPerSecondInput = screen.getByTestId("stepPerSecondInput")
                let dfResult = screen.getByTestId("dfResult")

                expect(funInput).toBeTruthy();
                expect(funInput.querySelectorAll('input')[0].value).toBe('x^2')
                expect(alphaInput).toBeTruthy();
                expect(alphaInput.querySelectorAll('input')[0].value).toBe('0.1')
                expect(xInput).toBeTruthy();
                expect(xInput.querySelectorAll('input')[0].value).toBe('-1')
                expect(stepPerSecondInput).toBeTruthy();
                expect(stepPerSecondInput.querySelectorAll('input')[0].value).toBe('1')
                expect(dfResult).toBeTruthy();
                expect(dfResult.querySelectorAll('input')[0].value).toBe('2 * x')
            })
            it("Should render proper user buttons", () => {
                render(visualizationPage())

                expect(screen.getByTestId("playButton")).toBeTruthy();
                expect(screen.getByTestId("stopButton")).toBeTruthy();
                expect(screen.getByTestId("pauseButton")).toBeTruthy();
            })
        })
        describe("When handling events", () => {
            describe("When user enters input", () => {
                it('Should update the function and its df', () => {
                    render(visualizationPage());

                    let funInput = screen.getByTestId("funInput").querySelectorAll('input')[0]
                    let dfResult = screen.getByTestId("dfResult").querySelectorAll('input')[0]

                    fireEvent.change(funInput, {target: {value: 'x^3'}})
                    expect(funInput.value).toBe('x^3')
                    expect(dfResult.value).toBe('3 * x ^ 2')

                })
                it('Should update alpha', () => {
                    render(visualizationPage());

                    let alphaInput = screen.getByTestId("alphaInput").querySelectorAll('input')[0]

                    fireEvent.change(alphaInput, {target: {value: 5}})
                    expect(alphaInput.value).toBe('5')

                })
                it('Should update starting value of x', () => {
                    render(visualizationPage());

                    let xInput = screen.getByTestId("xInput").querySelectorAll('input')[0]

                    fireEvent.change(xInput, {target: {value: 5}})
                    expect(xInput.value).toBe('5')

                })
                it('Should update the number of steps in each second', () => {
                    render(visualizationPage());

                    let stepPerSecondInput = screen.getByTestId("stepPerSecondInput").querySelectorAll('input')[0]

                    fireEvent.change(stepPerSecondInput, {target: {value: 5}})
                    expect(stepPerSecondInput.value).toBe('5')

                })
            })
        })
    })

    describe("Step By Step Page", () => {
        describe("When page renders", () => {
            it("Should render proper user inputs with default values",  () => {
                render(stepByStepPage());

                let funInput = screen.getByTestId("funInput")
                let alphaInput = screen.getByTestId("alphaInput")
                let xInput = screen.getByTestId("xInput")
                let dfResult = screen.getByTestId("dfResult")

                expect(funInput).toBeTruthy();
                expect(funInput.querySelectorAll('input')[0].value).toBe('x^2')
                expect(alphaInput).toBeTruthy();
                expect(alphaInput.querySelectorAll('input')[0].value).toBe('0.1')
                expect(xInput).toBeTruthy();
                expect(xInput.querySelectorAll('input')[0].value).toBe('-1')
                expect(dfResult).toBeTruthy();
                expect(dfResult.querySelectorAll('input')[0].value).toBe('2 * x')
            })
            it("Should render proper user buttons", () => {
                render(stepByStepPage())

                expect(screen.getByTestId("prevButton")).toBeTruthy();
                expect(screen.getByTestId("stopButton")).toBeTruthy();
                expect(screen.getByTestId("nextButton")).toBeTruthy();
            })
        })
        describe("When handling events", () => {
            describe("When user enters input", () => {
                it('Should update the function and its df', () => {
                    render(stepByStepPage());

                    let funInput = screen.getByTestId("funInput").querySelectorAll('input')[0]
                    let dfResult = screen.getByTestId("dfResult").querySelectorAll('input')[0]

                    fireEvent.change(funInput, {target: {value: 'x^3'}})
                    expect(funInput.value).toBe('x^3')
                    expect(dfResult.value).toBe('3 * x ^ 2')

                })
                it('Should update alpha', () => {
                    render(stepByStepPage());

                    let alphaInput = screen.getByTestId("alphaInput").querySelectorAll('input')[0]

                    fireEvent.change(alphaInput, {target: {value: 2}})
                    expect(alphaInput.value).toBe('2')

                })
                it('Should update starting value of x', () => {
                    render(stepByStepPage());

                    let xInput = screen.getByTestId("xInput").querySelectorAll('input')[0]

                    fireEvent.change(xInput, {target: {value: 5}})
                    expect(xInput.value).toBe('5')

                })
            })
        })
    })

    describe("Hyper-Parameter Page", () => {
        describe("When page renders", () => {
            it("Should render proper user inputs with default values",  () => {
                render(hyperParameterPage());

                let funInput = screen.getByTestId("funInput")
                let alphaInput = screen.getByTestId("alphaInput")
                let xInput = screen.getByTestId("xInput")
                let stepPerSecondInput = screen.getByTestId("stepPerSecondInput")
                let dfResult = screen.getByTestId("dfResult")

                expect(funInput).toBeTruthy();
                expect(funInput.querySelectorAll('input')[0].value).toBe('x^2')
                expect(alphaInput).toBeTruthy();
                expect(alphaInput.querySelectorAll('input')[0].value).toBe('0.1')
                expect(xInput).toBeTruthy();
                expect(xInput.querySelectorAll('input')[0].value).toBe('-1')
                expect(stepPerSecondInput).toBeTruthy();
                expect(stepPerSecondInput.querySelectorAll('input')[0].value).toBe('1')
                expect(dfResult).toBeTruthy();
                expect(dfResult.querySelectorAll('input')[0].value).toBe('2 * x')
            })
            it("Should render proper user buttons", () => {
                render(hyperParameterPage())

                expect(screen.getByTestId("playButton")).toBeTruthy();
                expect(screen.getByTestId("stopButton")).toBeTruthy();
                expect(screen.getByTestId("pauseButton")).toBeTruthy();
            })
        })
        describe("When handling events", () => {
            describe("When user enters input", () => {
                it('Should update the function and its df', () => {
                    render(hyperParameterPage());

                    let funInput = screen.getByTestId("funInput").querySelectorAll('input')[0]
                    let dfResult = screen.getByTestId("dfResult").querySelectorAll('input')[0]

                    fireEvent.change(funInput, {target: {value: 'x^3'}})
                    expect(funInput.value).toBe('x^3')
                    expect(dfResult.value).toBe('3 * x ^ 2')

                })
                it('Should update alpha', () => {
                    render(hyperParameterPage());

                    let alphaInput = screen.getByTestId("alphaInput").querySelectorAll('input')[0]

                    fireEvent.change(alphaInput, {target: {value: 2}})
                    expect(alphaInput.value).toBe('2')

                })
                it('Should update starting value of x', () => {
                    render(hyperParameterPage());

                    let xInput = screen.getByTestId("xInput").querySelectorAll('input')[0]

                    fireEvent.change(xInput, {target: {value: 5}})
                    expect(xInput.value).toBe('5')

                })
                it('Should update the number of steps in each second', () => {
                    render(hyperParameterPage());

                    let stepPerSecondInput = screen.getByTestId("stepPerSecondInput").querySelectorAll('input')[0]

                    fireEvent.change(stepPerSecondInput, {target: {value: 5}})
                    expect(stepPerSecondInput.value).toBe('5')

                })
            })
        })
    })
})