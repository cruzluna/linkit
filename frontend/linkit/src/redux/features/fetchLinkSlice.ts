import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LinkWithoutUserId } from "@/components/links";

const initialState = {
    linkData: [] as LinkWithoutUserId[],
    countEnabledLinks: 0,
}

export const fetchLink = createSlice({
    name: "fetchLink",
    initialState: initialState,
    reducers: {
        setLinkData: (state, action: PayloadAction<{ linkData: LinkWithoutUserId[]; countEnabledLinks: number }>) => {
            state.linkData = action.payload.linkData;
            state.countEnabledLinks = action.payload.countEnabledLinks;
        },
    },
});

export const { setLinkData } = fetchLink.actions;
export default fetchLink.reducer;