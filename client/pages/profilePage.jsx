import React,{useEffect, useState} from 'react';
import { useRouter } from "next/router";
import Badge from '../components/badge';
import Layout from '../components/Layout';
import {AiFillStar} from "react-icons/ai";
import {FaFlagCheckered} from "react-icons/fa";
import useAuth from "../store/authStore.js";
import { gql, useApolloClient, useLazyQuery } from "@apollo/client";

const ProfilePage = () => {

    const [xp,setXP] = useState(0)

    // Get Data From JWT Token
    const jwtTokenData = useAuth((state) => {
        return state.decodedToken;
    })();

    const [profileQuery, { loading, error, data }] = useLazyQuery(
        gql`
        query {
            getProfileInfo( email: "${jwtTokenData.email}" ) {
                xp
            }
        }
    `,
        { fetchPolicy: "no-cache" }
    );

    const router = useRouter();
    useEffect(() => {

        profileQuery();
        if (!loading && !error) {
            if (data) {
                setXP(data.getProfileInfo.xp);
            }
        } else if (error) {
            if (error.message === "Unauthorized") {
                router.push("/expire");
                return;
            }
        }
    }, [loading, error, router, data, profileQuery]);

    // var userBadges = getUserBadgesString;
    // for(j to allBadges.length){
    // 	for( i to userBadges[j]){
    // 		return (
    // 		<Badge level=i colour=allBadges[j].colour type=allBadges[j].type title=allBadges[j].title/>
    // 		}
    // 	}
    // }


    return (
        <Layout>
        <div className="flex flex-col justify-center items-center mt-5 w-full">
            <div className="avatar placeholder m-3">
                <div className="w-20 rounded-full bg-secondary text-neutral-content">
                    <span className="text-5xl capitalize">
                        {jwtTokenData.name[0]}
                    </span>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="text-xl font-bold capitalize">{jwtTokenData.name}</div>
                <h3 className='text-primary' >Level 3 </h3>
            </div>
        </div>

         <div className="flex flex-row items-center w-full px-10 mx-5 relative">

                <div className="flex justify-self-end items-center">
                    <AiFillStar className="text-secondary" size={40}/>
                    <span className="truncate text-sm font-bold ml-3">{xp} XP</span>
                </div>
                <div className="rounded bg-base-200 h-4 w-full mx-3 content-center">
                    <div style={{ width: `${xp}%`}} className="bg-secondary rounded h-4"></div>
                </div> 
                <FaFlagCheckered className="pb-2" size={30}/>
                <span className='pb-2 ml-2 text-xs' > Maximum Access</span> 
                
        </div>

    
        <div className="divider mt-10 text-base md:text-lg lg:text-2xl px-3">
                BADGES
        </div>
            
        
        <div className="mx-5 mt-5 grid grid-cols-7 space-y-2 space-x-3">
            <Badge width={160} active={true} level={1} type="concept" colour="#be185d" text="CONCEPT CONNOISSEUR" desc="You created 3 invites"/>
            <Badge width={160} active={true} level={1} type="invite" colour="#84cc16" text="INVITE ROOKIE" desc="You created 3 invites"/>
            <Badge width={160} active={true} level={2} type="invite" colour="#84cc16" text="INVITE AMATEUR" desc="You created 30 invites"/>
            <Badge width={160} active={false} level={3} type="invite" colour="#84cc16" text="INVITE EXPERT" desc="You created 300 invites"/>
            <Badge width={160} active={true} level={1} type="sleepover" colour="#1e3a8a" text="SLEEPOVER PARTY" desc="You hosted 7 sleepovers"/>
            <Badge width={160} active={true} level={1} type="time" colour="#dc2626" text="VMS TODDLER" desc="You celebrated 30-days with VMS"/>
            <Badge width={160} active={true} level={3} type="suggestion" colour="#22d3ee" text="ULTIMATE ADVISEE" desc="You used 2 system suggestions"/>
            <Badge width={160} active={true} level={1} type="visits" colour="#facc15" text="MR. POPULAR" desc="You had 15 visitors"/>
            <Badge width={160} active={true} level={2} type="visits" colour="#facc15" text="MRS. POPULAR" desc="You had 25 visitors"/>
            <Badge width={160} active={false} level={3} type="visits" colour="#facc15" text="DR. POPULAR" desc="You had 100 visitors"/>
            <Badge width={160} active={true} level={1} type="cancellation" colour="#ea580c" text="DASHBOARD DUSTER" desc="You cancelled 8 invites"/>
            <Badge width={160} active={false} level={2} type="cancellation" colour="#ea580c" text="DASHBOARD SWEEPER" desc="You cancelled 18 invites"/>
            <Badge width={160} active={false} level={3} type="cancellation" colour="#ea580c" text="DASHBOARD POLISHER" desc="You cancelled 70 invites"/>
        </div>

        <div className="divider mt-10 text-base md:text-lg lg:text-2xl px-3">
            PRIVILEGES
        </div>
        
        </Layout>
    );
}

export default ProfilePage;
