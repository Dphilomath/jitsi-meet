// @flow

import { Component } from 'react';
import type { Dispatch } from 'redux';

/**
 * The type of the React {@code Component} props of
 * {@link AbstractSharedPPTDialog}.
 */
export type Props = {

    /**
     * Invoked to update the shared video link.
     */
    dispatch: Dispatch<any>,

    /**
     * Function to be invoked on confirm ppt sharing.
     */
    onPostSubmit: Function,

    /**
     * Invoked to obtain translated strings.
     */
    t: Function
};

/**
 * Implements an abstract class for {@code SharedPPTDialog}.
 */
export default class AbstractSharedPPTDialog<S: *> extends Component < Props, S > {

    /**
     * Instantiates a new component.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this._onConfirmSharePPT = this._onConfirmSharePPT.bind(this);
    }

    _onConfirmSharePPT: () => boolean;

}
