import StyleSheet from 'react-style';
import React, { Component, PropTypes as Type } from 'react';
import assign from 'react/lib/Object.assign';
import cloneWithProps from 'react/lib/cloneWithProps';
import Cell from './cell.component';
import { vertical, horizontal } from './utils/flex-alignments';
import { baseMethods, variables } from './defaults';
import doubleUnit from './utils/double-unit';

const GridStyles = StyleSheet.create({
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: 0,
    margin: `0 -${ variables.gutter } ${ doubleUnit(variables.gutter) }`
  }
}, process.env.NODE_ENV === 'production');

const HorizontalStyles = StyleSheet.create({
  left: { justifyContent: horizontal.left },
  center: { justifyContent: horizontal.center },
  right: { justifyContent: horizontal.right }
}, process.env.NODE_ENV === 'production');

const VerticalStyles = StyleSheet.create({
  top: { alignItems: vertical.top },
  center: { alignItems: vertical.center },
  bottom: { alignItems: vertical.bottom }
}, process.env.NODE_ENV === 'production');

class Grid extends Component {
  static propTypes = {
    gutter: Type.string,
    flexCells: Type.bool,
    align: Type.oneOf(['top', 'center', 'bottom'])
  }

  render() {
    const {
      gutter,
      style,
      styles,
      align,
      hAlign,
      flexCells,
      children,
      ...rest } = this.props;

    this.styles = [
      GridStyles.base,
      gutter ? { margin: `0 -${ gutter } ${ doubleUnit(gutter) }` } : null,
      align ? VerticalStyles[align] : null,
      hAlign ? HorizontalStyles[hAlign] : null,
      style
    ].concat( Array.isArray(styles) ? styles : [styles] );

    const wrapppedChildren = flexCells ?
      React.Children.map(
        children, child => child.type === Cell ?
          cloneWithProps( child, { flex: true }) :
          cloneWithProps( child ) ) :
      children;

    return (
      <div { ...rest } styles={ this.styles }>
        { wrapppedChildren }
      </div>
    );
  }
}

assign(Grid.prototype, baseMethods);

export default Grid;