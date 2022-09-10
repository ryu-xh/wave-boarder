import React from 'react';
import { Label, Tag } from 'konva/lib/shapes/Label';
import { Line } from 'konva/lib/shapes/Line';
import { Text } from 'konva/lib/shapes/Text';
import {Layer, CreatePointMarkerOptions} from "peaks.js";
import {Group} from "konva/lib/Group";

const PointMarker = (options: CreatePointMarkerOptions) => {
  const tag = new Tag({
    fill:             options.color,
    stroke:           options.color,
    strokeWidth:      1,
    pointerDirection: 'down',
    pointerWidth:     10,
    pointerHeight:    10,
    lineJoin:         'round',
    shadowColor:      'black',
    shadowBlur:       10,
    shadowOffsetX:    3,
    shadowOffsetY:    3,
    shadowOpacity:    0.3
  });

  const label = new Label({
    x: 0.5,
    y: 0.5,
  });

  const text = new Text({
    text: options.point.labelText,
    fontSize: 12,
    padding: 5,
    fill: '#FFFFFF',
  });

  const line = new Line({
    x: 0,
    y: 0,
    stroke: options.color,
    strokeWidth: 1,
  });

  label.add(tag);
  label.add(text);

  var group: any = null;

  const init = (_group: Group) => {

    _group.add(label);
    _group.add(line);

    group = _group;

    fitToView();
    bindEventHandlers();
  };

  const fitToView = () => {
    const height = options.layer.getHeight();

    const labelHeight = text.height() + 2 * text.padding();
    const offsetTop = height - labelHeight;
    const offsetBottom = height;
    group.y(offsetTop + labelHeight + 0.5);

    line.points([0.5, 0, 0.5, height - labelHeight - offsetTop - offsetBottom]);
  }

  const bindEventHandlers = () => {

  }
};

const createPointMarker = (options: CreatePointMarkerOptions) => {
  if (options.view === 'zoomview') {
    return PointMarker(options);
  }
};

export default createPointMarker;