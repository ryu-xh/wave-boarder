import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Waveform from "./components/Waveform";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const FileLoadSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  width: 500px;
`;

const SelectContainer = styled.div`
  
`;

const FileInput = styled.input`
  display: none;
`;

const WaveformContent = styled.div`
  display: block;
`;

const App: React.FC = () => {
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [labUrl, setLabUrl] = useState<string>('');
  const [ustUrl, setUstUrl] = useState<string>('');

  const audioRef = useRef<HTMLInputElement>(null);
  const labRef = useRef<HTMLInputElement>(null);
  const ustRef = useRef<HTMLInputElement>(null);

  return (
    <Container>
      <FileLoadSection>
        <SelectContainer>
          <FileInput type="file" accept="audio/*" ref={audioRef} onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setAudioUrl(URL.createObjectURL(e.target.files[0]));
            }
          }}
            style={{display: 'none'}}
          />
          <Button variant="outlined" onClick={() => {
            audioRef.current && audioRef.current.click();
          }}>wav 파일 불러오기</Button>
        </SelectContainer>

        <SelectContainer>
          <FileInput type="file" accept=".lab" ref={labRef} onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setLabUrl(URL.createObjectURL(e.target.files[0]));
            }
          }} />
          <Button variant="outlined" onClick={() => {
            labRef.current && labRef.current.click();
          }}>lab 파일 불러오기</Button>
        </SelectContainer>

        <SelectContainer>
          <FileInput type="file" accept=".ust,.ustx" ref={ustRef} onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setUstUrl(URL.createObjectURL(e.target.files[0]));
            }
          }} />
          <Button variant="outlined" onClick={() => {
            ustRef.current && ustRef.current.click();
          }}>ust 파일 불러오기</Button>
        </SelectContainer>
      </FileLoadSection>
      <WaveformContent>
        {
          audioUrl && labUrl && <Waveform audioUrl={audioUrl} labUrl={labUrl} ustUrl={ustUrl} />
        }
      </WaveformContent>
    </Container>
  );
}

export default App;
