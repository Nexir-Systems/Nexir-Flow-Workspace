import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEntityCatalogUiStore } from '../../../stores/entityCatalogUiStore';
import type { EntityCategory, EntityStatus } from '../../../api/types/entities';
import type { CatalogSortField } from '../../../core/entity-catalog-filter';

const statuses: Array<'all' | EntityStatus> = ['all', 'draft', 'active', 'archived'];
const categories: Array<'all' | EntityCategory> = [
  'all',
  'general',
  'billing',
  'operations',
  'security',
];

function titleCase(s: string) {
  if (s === 'all') return 'All';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Search on the left; filters + sort align to the right on wide viewports (Entities + Favorites). */
export function EntityCatalogToolbar() {
  const searchQuery = useEntityCatalogUiStore((s) => s.searchQuery);
  const status = useEntityCatalogUiStore((s) => s.status);
  const category = useEntityCatalogUiStore((s) => s.category);
  const sortBy = useEntityCatalogUiStore((s) => s.sortBy);
  const sortDirection = useEntityCatalogUiStore((s) => s.sortDirection);
  const setSearchQuery = useEntityCatalogUiStore((s) => s.setSearchQuery);
  const setStatus = useEntityCatalogUiStore((s) => s.setStatus);
  const setCategory = useEntityCatalogUiStore((s) => s.setCategory);
  const setSortBy = useEntityCatalogUiStore((s) => s.setSortBy);
  const setSortDirection = useEntityCatalogUiStore((s) => s.setSortDirection);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'stretch', md: 'center' },
        justifyContent: 'space-between',
        gap: { xs: 2, md: 2.5 },
        width: '100%',
        p: { xs: 2.5, md: 3 },
      }}
    >
      <TextField
        size="small"
        label="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          width: { xs: '100%', md: 'auto' },
          minWidth: { md: 240 },
          maxWidth: { md: 480 },
          flex: { md: '0 1 480px' },
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: { xs: 'flex-start', md: 'flex-end' },
          gap: 2,
          flex: { md: '1 1 auto' },
          minWidth: 0,
          width: { xs: '100%', md: 'auto' },
        }}
      >
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel id="nx-status-filter">Status</InputLabel>
          <Select
            labelId="nx-status-filter"
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value as 'all' | EntityStatus)}
          >
            {statuses.map((s) => (
              <MenuItem key={s} value={s}>
                {titleCase(s)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel id="nx-category-filter">Category</InputLabel>
          <Select
            labelId="nx-category-filter"
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value as 'all' | EntityCategory)}
          >
            {categories.map((c) => (
              <MenuItem key={c} value={c}>
                {titleCase(c)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel id="nx-sort-by">Sort by</InputLabel>
          <Select
            labelId="nx-sort-by"
            label="Sort by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as CatalogSortField)}
          >
            <MenuItem value="updatedAt">Updated</MenuItem>
            <MenuItem value="priority">Priority</MenuItem>
            <MenuItem value="status">Status</MenuItem>
            <MenuItem value="name">Name</MenuItem>
          </Select>
        </FormControl>
        <ToggleButtonGroup
          size="small"
          exclusive
          value={sortDirection}
          onChange={(_, v) => {
            if (v) setSortDirection(v);
          }}
          sx={{ flexShrink: 0 }}
        >
          <ToggleButton value="asc">Asc</ToggleButton>
          <ToggleButton value="desc">Desc</ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
}
