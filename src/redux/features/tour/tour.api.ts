import { baseApi } from "@/redux/baseApi";




export const tourAPi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addTourType: builder.mutation({
            query: (TourTypeName) => ({
                url: "/tour/create-tour-type",
                method: "POST",
                data: TourTypeName,
            }),
            invalidatesTags: ["TOUR"]
        }),
        getTourTypes: builder.query({
            query: () => ({
                url: "/tour/tour-types",
                method: "GET",
            }),
            providesTags: ["TOUR"],
            transformResponse: (response) => response.data,
        })
    })
})

export const {useGetTourTypesQuery, useAddTourTypeMutation } = tourAPi