import { withProps } from 'recompose';

// Enhance Day component to display selected state based on an array of selected dates
const enhanceDay = highlighted => withProps(props => ({
        isHighlighted: highlighted.indexOf(props.date) !== -1,
    }
));


// Enhancer to highlight multiple dates
export const withHighlightedDates = withProps(({
    highlighted,
    DayComponent,
  }) => ({
        DayComponent: enhanceDay(highlighted)(DayComponent),
    }));