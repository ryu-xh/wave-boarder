import React, {createRef, useEffect, useRef, useState} from 'react';
import Peaks, {PeaksOptions, PointAddOptions} from 'peaks.js';

import './Waveform.css';
import createPointMarker from "./Marker";

interface WaveformProps {
  audioUrl: string;
  labUrl: string;
  ustUrl: string;
}

const Waveform: React.FC<WaveformProps> = ({
                                             audioUrl,
                                             labUrl,
                                             ustUrl,
                                           }) => {

  const zoomviewWaveformRef = useRef<HTMLDivElement>(null);
  const overviewWaveformRef = useRef<HTMLDivElement>(null);
  const audioElementRef = useRef<HTMLAudioElement>(null);
  const [peaks, setPeaks] = React.useState<any>(null);
  const [points, setPoints] = useState<PointAddOptions[]>([]);

  const initialize = () => {
    const audioContext = new AudioContext();

    const options = {
      containers: {
        overview: overviewWaveformRef.current,
        zoomview: zoomviewWaveformRef.current
      },
      mediaElement: audioElementRef.current,
      keyboard: true,
      logger: console.error.bind(console),
      zoomLevels: [32, 64, 128, 256, 512],
      overview: {
        playheadColor: '#FFFFFF90',
        playedWaveformColor: '#593695',
        waveformColor: '#00E180',
      },
      zoomview: {
        playheadColor: '#FC6935',
        wheelMode: 'scroll',
      },
      webAudio: {
        audioContext: audioContext,
      },

      createPointMarker: createPointMarker,
    };

    if (peaks) {
      peaks.destroy();
      setPeaks(null);
    }

    Peaks.init(options, (err, _peaks) => {
      if (err) {
        console.error(err.message);
        return;
      }

      setPeaks(_peaks);
    });

  };

  useEffect(() => {
    initialize();

  }, [audioUrl]);

  useEffect(() => {
    if (peaks != null) {
      const overview = peaks.views.getView('overview');
      const zoomview = peaks.views.getView('zoomview');

      if(points.length > 0) {
        peaks.points.removeAll();
        peaks.points.add(points);
      }
    }
  }, [peaks, points]);

  useEffect(() => {
    if (labUrl) {
      fetch(labUrl)
        .then(response => response.text())
        .then(text => {
          const lines = text.split(/\r?\n/);
          const labelPoints: PointAddOptions[] = [];
          lines.forEach(line => {
            const [startTime, endTime,labelText] = line.split(' ');
            if (startTime && endTime && labelText)
              labelPoints.push({
                time: parseFloat(endTime) / 10000000,
                editable: true,
                color: '#76BBF8',
                labelText: labelText,
              });
          });
          setPoints(labelPoints);
        });
    }
  }, [labUrl]);

  return (
    <div>
      <div className="zoomview-container" ref={zoomviewWaveformRef}></div>
      <div className="overview-container" ref={overviewWaveformRef}></div>

      <audio ref={audioElementRef} controls src={audioUrl}>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Waveform;
