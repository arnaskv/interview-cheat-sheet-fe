import { FC, useEffect, useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Question from '../../interfaces/Question';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

interface Props {
  questions: Question[] | null;
  onSearchResult: (searchedQuestions: Question[]) => void;
  isSearching: (value: boolean) => void;
}

const SearchBar: FC<Props> = ({ questions, onSearchResult, isSearching }) => {
  const [searchText, setSearchText] = useState('');
  const searchRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const filteredQuestions =
      questions?.filter(question => question.title.toLowerCase().includes(searchText.toLowerCase())) || [];

    onSearchResult(filteredQuestions);
    isSearching(!!searchText);
  }, [searchText, questions, onSearchResult, isSearching]);

  return (
    <TextField
      inputRef={searchRef}
      size="small"
      disabled={!questions}
      value={searchText}
      onChange={event => setSearchText(event.target.value)}
      sx={{
        width: '100%',
        backgroundColor: '#f1f2f5',
        borderRadius: '25px',
        '& fieldset': {
          borderRadius: '25px',
          border: 'none',
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" sx={{ paddingLeft: '0.5rem' }}>
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: searchText && (
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                setSearchText('');
                searchRef.current?.focus();
              }}
            >
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      placeholder="Search..."
    />
  );
};

export default SearchBar;
