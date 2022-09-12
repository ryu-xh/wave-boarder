import React from 'react';
import { Label, Tag } from 'konva/lib/shapes/Label';
import { Line } from 'konva/lib/shapes/Line';
import { Text } from 'konva/lib/shapes/Text';
import {Group} from "konva/lib/Group";
import {Layer, CreatePointMarkerOptions} from "peaks.js";

class PointMarker {
  private options: CreatePointMarkerOptions;
  private group: Group = new Group();
  private label: Label = new Label();
  private tag: Tag = new Tag();
  private text: Text = new Text();
  private line: Line = new Line();

  constructor(_options: CreatePointMarkerOptions) {
    this.options = _options;
  }

  init(_group: Group) {
    this.group = _group;

    this.label = new Label({
      x: 0.5,
      y: 0.5
    });

    this.tag = new Tag({
      fill:             this.options.color,
      stroke:           this.options.color,
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

    this.label.add(this.tag);

    this.text = new Text({
      text:       this.options.point.labelText,
      fontFamily: 'Calibri',
      fontSize:   14,
      padding:    5,
      fill:       'white'
    });

    this.label.add(this.text);

    // Vertical Line - create with default y and points, the real values
    // are set in fitToView().
    this.line = new Line({
      x:           0,
      y:           0,
      stroke:      this.options.color,
      strokeWidth: 1
    });

    _group.add(this.label);
    _group.add(this.line);

    this.fitToView();

    this.bindEventHandlers();
  };

  bindEventHandlers() {
    this.group.on('mouseenter', () => {
      document.body.style.cursor = 'move';
    });

    this.group.on('mouseleave', () => {
      document.body.style.cursor = 'default';
    });
  };

  fitToView() {
    const height = this.options.layer.getHeight();

    const labelHeight = this.text.height() + 2 * this.text.padding();
    const offsetTop = 14;
    const offsetBottom = 26;

    this.group.y(offsetTop + labelHeight + 0.5);

    this.line.points([0.5, 0, 0.5, height - labelHeight - offsetTop - offsetBottom]);
  };
}

const createPointMarker = (options: any) => {
  console.log(options.marker);
  if (options.view === 'zoomview') {
    return new PointMarker(options);
  }
};

export default createPointMarker;