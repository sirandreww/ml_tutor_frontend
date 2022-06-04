/* eslint-disable */
import {  render, screen } from '@testing-library/react';
import GradientDescentGenericPage2D from "../GradientDescentGenericPage2D";

const visualizationPage = () => {
    return(
        <GradientDescentGenericPage2D
            alphaType='input'
            buttonsType='playGround'
            generateQuestionTable={false}
        />
    )
}
const stepByStepPage = () => {
    return (
        <GradientDescentGenericPage2D
            alphaType='input'
            buttonsType='stepByStep'
            generateQuestionTable={true}
        />
    )
}
const hyperParameterPage = () => {
    return (
        <GradientDescentGenericPage2D
            alphaType='slider'
            buttonsType='hyperParameter'
            generateQuestionTable={false}
        />
    )
}

describe("Testing Gradient Descent 2D Pages", () => {
    describe("Visualization page", () => {
        describe("When page renders", () => {
            it("Should render proper user inputs with default values",  () => {
                render(visualizationPage());

                let funInput = screen.getByTestId("funInput")
                let alphaInput = screen.getByTestId("alphaInput")
                let xInput = screen.getByTestId("xInput")
                let yInput = screen.getByTestId("yInput")
                let stepPerSecondInput = screen.getByTestId("stepPerSecondInput")
                let dfxResult = screen.getByTestId("dfxResult")
                let dfyResult = screen.getByTestId("dfyResult")

                expect(funInput).toBeTruthy();
                expect(funInput.querySelectorAll('input')[0].value).toBe('x^2+y^2')
                expect(alphaInput).toBeTruthy();
                expect(alphaInput.querySelectorAll('input')[0].value).toBe('0.05')
                expect(xInput).toBeTruthy();
                expect(xInput.querySelectorAll('input')[0].value).toBe('-10')
                expect(yInput).toBeTruthy();
                expect(yInput.querySelectorAll('input')[0].value).toBe('-10')
                expect(stepPerSecondInput).toBeTruthy();
                expect(stepPerSecondInput.querySelectorAll('input')[0].value).toBe('1')
                expect(dfxResult).toBeTruthy();
                expect(dfxResult.querySelectorAll('input')[0].value).toBe('2 * x')
                expect(dfyResult).toBeTruthy();
                expect(dfyResult.querySelectorAll('input')[0].value).toBe('2 * y')
            })
            it("Should render proper user buttons", () => {
                render(visualizationPage())

                expect(screen.getByTestId("brushButton")).toBeTruthy();
                expect(screen.getByTestId("playButton")).toBeTruthy();
                expect(screen.getByTestId("stopButton")).toBeTruthy();
                expect(screen.getByTestId("pauseButton")).toBeTruthy();
            })
        })
        describe("When handling events", () => {
            describe("When user enters input", () => {

            })
            describe("When user click buttons", () => {

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
                let yInput = screen.getByTestId("yInput")
                let dfxResult = screen.getByTestId("dfxResult")
                let dfyResult = screen.getByTestId("dfyResult")

                expect(funInput).toBeTruthy();
                expect(funInput.querySelectorAll('input')[0].value).toBe('x^2+y^2')
                expect(alphaInput).toBeTruthy();
                expect(alphaInput.querySelectorAll('input')[0].value).toBe('0.05')
                expect(xInput).toBeTruthy();
                expect(xInput.querySelectorAll('input')[0].value).toBe('-10')
                expect(yInput).toBeTruthy();
                expect(yInput.querySelectorAll('input')[0].value).toBe('-10')
                expect(dfxResult).toBeTruthy();
                expect(dfxResult.querySelectorAll('input')[0].value).toBe('2 * x')
                expect(dfyResult).toBeTruthy();
                expect(dfyResult.querySelectorAll('input')[0].value).toBe('2 * y')
            })
            it("Should render proper user buttons", () => {
                render(stepByStepPage())

                expect(screen.getByTestId("brushButton")).toBeTruthy();
                expect(screen.getByTestId("prevButton")).toBeTruthy();
                expect(screen.getByTestId("stopButton")).toBeTruthy();
                expect(screen.getByTestId("nextButton")).toBeTruthy();
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
                let yInput = screen.getByTestId("yInput")
                let stepPerSecondInput = screen.getByTestId("stepPerSecondInput")
                let dfxResult = screen.getByTestId("dfxResult")
                let dfyResult = screen.getByTestId("dfyResult")

                expect(funInput).toBeTruthy();
                expect(funInput.querySelectorAll('input')[0].value).toBe('x^2+y^2')
                expect(alphaInput).toBeTruthy();
                expect(alphaInput.querySelectorAll('input')[0].value).toBe('0.05')
                expect(xInput).toBeTruthy();
                expect(xInput.querySelectorAll('input')[0].value).toBe('-10')
                expect(yInput).toBeTruthy();
                expect(yInput.querySelectorAll('input')[0].value).toBe('-10')
                expect(stepPerSecondInput).toBeTruthy();
                expect(stepPerSecondInput.querySelectorAll('input')[0].value).toBe('1')
                expect(dfxResult).toBeTruthy();
                expect(dfxResult.querySelectorAll('input')[0].value).toBe('2 * x')
                expect(dfyResult).toBeTruthy();
                expect(dfyResult.querySelectorAll('input')[0].value).toBe('2 * y')
            })
            it("Should render proper user buttons", () => {
                render(hyperParameterPage())

                expect(screen.getByTestId("brushButton")).toBeTruthy();
                expect(screen.getByTestId("playButton")).toBeTruthy();
                expect(screen.getByTestId("stopButton")).toBeTruthy();
                expect(screen.getByTestId("pauseButton")).toBeTruthy();
            })
        })
    })
})