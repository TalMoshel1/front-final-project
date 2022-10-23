import React, { useEffect, useState } from 'react';
import { ListStyle } from './ListStyle';

type SuggestionStyleProps = {
    children?: React.ReactNode
}

function FewSuggestionsStyle({children}: SuggestionStyleProps) {

    return <div style={{width: '16rem'}}>
        {children}
        </div>
}

export default FewSuggestionsStyle;
