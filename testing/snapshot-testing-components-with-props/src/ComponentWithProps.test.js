import React from 'react';
import { create } from 'react-test-renderer';

import ComponentWithProps from './ComponentWithProps';

describe(`ComponentWithProps render tests`, () => {

    let componentToTest;

    const props = {
        headerText: `A header`,
        contentText: `Some content`,
        numericProp: 100,
        expressionProp: 2 + 2,
        valueProp: 1000,
        objectProp: {
            key1: `key 1 value`,
            key2: 2,
            key3: [`Key 3`, `array`, `values`]
        },
        arrayProp: [1, 2, 3],
        functionProp: () => `Hello World`,
    }

    beforeEach(() => {
        const testInstance = create(<ComponentWithProps {...props} />);
        componentToTest = testInstance.root;
    });

    it(`should render the text "A header" in a h1`, () => {
        const h1Render = componentToTest.findByType(`h1`);

        expect(h1Render.children).toEqual([props.headerText]);
    });

    it(`should render the text "Some content" in the first p element`, () => {
        const firstPRender = componentToTest.findAllByType(`p`)[0];

        expect(firstPRender.children).toEqual([props.contentText]);
    });	

    it(`should render the correct values when rendering the nextNumberDisplay`, () => {
        const nextNumberParas = componentToTest.findAllByProps({ className: "nnd" });

        for (let i = 0; i < props.arrayProp.length; i++) {
            expect(nextNumberParas[i].children).toContain(props.arrayProp[i].toString(), (props.arrayProp[i] + 1).toString());
        }
    });

    it(`should render the correct values when rendering the objectPropDispay`, () => {
        const objectPropDisplayParas = componentToTest.findAllByProps({ className: "opd" });

        for (let i = 0; i < Object.keys(props.objectProp).length; i++) {
            expect(objectPropDisplayParas[i].children).toContain(`key${i + 1}`, props.objectProp[`key${i + 1}`]);
        }
    });

});