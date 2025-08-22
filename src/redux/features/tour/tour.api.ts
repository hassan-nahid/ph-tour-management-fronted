import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITourPackage } from "@/types";


export const tourAPi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addTour: builder.mutation({
            query: (tourData) => ({
                url: "/tour/create",
                method: "POST",
                data: tourData,
            }),
            invalidatesTags: ["TOUR"]
        }),
        addTourType: builder.mutation({
            query: (TourTypeName) => ({
                url: "/tour/create-tour-type",
                method: "POST",
                data: TourTypeName,
            }),
            invalidatesTags: ["TOUR"]
        }),
        getTourTypes: builder.query({
            query: (params) => ({
                url: "/tour/tour-types",
                method: "GET",
                params
            }),
            providesTags: ["TOUR"],
            transformResponse: (response) => response.data,
        }),
        removeTourTypes: builder.mutation({
            query: (tourTypeId) => ({
                url: `/tour/tour-types/${tourTypeId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["TOUR"],
        }),
        getAllTours: builder.query<ITourPackage[], unknown>({
            query: (params) => ({
                url: "/tour",
                method: "GET",
                params: params,
            }),
            providesTags: ["TOUR"],
            transformResponse: (response: IResponse<ITourPackage[]>) => response.data
        })
    })
})

export const { useGetTourTypesQuery,
    useAddTourTypeMutation, useRemoveTourTypesMutation,
    useAddTourMutation, useGetAllToursQuery } = tourAPi